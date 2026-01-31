/**
 * UTM Storage - Persistência de parâmetros UTM para atribuição cross-session
 * 
 * Salva os UTMs da primeira visita no localStorage para manter a atribuição
 * mesmo quando o usuário sai e volta pelo Google ou outro canal.
 */

const UTM_STORAGE_KEY = "mentoria_utm_params";
const UTM_EXPIRY_DAYS = 30;

interface StoredUtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  saved_at: number;
}

/**
 * Salva os parâmetros UTM da URL atual no localStorage
 * Só salva se tiver pelo menos utm_source
 */
export function saveUtmParams(searchParams: URLSearchParams): void {
  const utmSource = searchParams.get("utm_source");
  
  // Só salva se tiver pelo menos utm_source
  if (!utmSource) return;
  
  // Verifica se já existe UTM salvo (não sobrescreve)
  const existing = localStorage.getItem(UTM_STORAGE_KEY);
  if (existing) {
    try {
      const parsed = JSON.parse(existing) as StoredUtmParams;
      const expiryMs = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      
      // Se ainda não expirou, não sobrescreve
      if (Date.now() - parsed.saved_at < expiryMs) {
        console.log("📦 [UTM] Usando UTMs existentes:", parsed.utm_source);
        return;
      }
    } catch {
      // Se falhar o parse, prossegue e salva novos
    }
  }
  
  const utmParams: StoredUtmParams = {
    utm_source: utmSource,
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
    utm_content: searchParams.get("utm_content"),
    utm_term: searchParams.get("utm_term"),
    saved_at: Date.now(),
  };
  
  localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  console.log("📦 [UTM] Salvando novos UTMs:", utmParams.utm_source);
}

/**
 * Recupera os parâmetros UTM salvos no localStorage
 * Retorna null se não existir ou se expirou
 */
export function getStoredUtmParams(): Record<string, string> | null {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored) as StoredUtmParams;
    const expiryMs = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    
    // Verifica se expirou
    if (Date.now() - parsed.saved_at > expiryMs) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      console.log("📦 [UTM] UTMs expirados, removidos");
      return null;
    }
    
    // Retorna apenas os valores não nulos
    const result: Record<string, string> = {};
    if (parsed.utm_source) result.utm_source = parsed.utm_source;
    if (parsed.utm_medium) result.utm_medium = parsed.utm_medium;
    if (parsed.utm_campaign) result.utm_campaign = parsed.utm_campaign;
    if (parsed.utm_content) result.utm_content = parsed.utm_content;
    if (parsed.utm_term) result.utm_term = parsed.utm_term;
    
    return Object.keys(result).length > 0 ? result : null;
  } catch {
    return null;
  }
}

/**
 * Mescla UTMs da URL atual com UTMs salvos (URL tem prioridade)
 */
export function getMergedUtmParams(searchParams: URLSearchParams): Record<string, string> {
  const storedUtms = getStoredUtmParams() || {};
  const currentUtms: Record<string, string> = {};
  
  // Captura UTMs da URL atual
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(param => {
    const value = searchParams.get(param);
    if (value) currentUtms[param] = value;
  });
  
  // URL atual tem prioridade sobre salvos
  return { ...storedUtms, ...currentUtms };
}

/**
 * Limpa os UTMs salvos (útil após conversão)
 */
export function clearStoredUtmParams(): void {
  localStorage.removeItem(UTM_STORAGE_KEY);
  console.log("📦 [UTM] UTMs limpos após conversão");
}
