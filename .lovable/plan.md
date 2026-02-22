

# Correcao do Video "Quem Ja Viveu a Experiencia"

## Problemas identificados

1. **Poster/capa inadequada**: O video usa `heroEvent` (imagem generica do hero) como poster, que nao tem relacao com o conteudo do video de depoimentos
2. **Video cortado**: A classe `object-cover` recorta o video para preencher o container, cortando partes importantes tanto no mobile quanto no desktop

## Solucao

### 1. Remover poster estatico e usar o primeiro frame do video como capa

Como nao existe uma imagem especifica de depoimentos nos assets, a melhor abordagem e:
- Implementar um **player customizado com capa interativa**: um thumbnail gerado pelo proprio video (primeiro frame) com um botao de play sobreposto
- Ao clicar no play, o video inicia
- Isso garante que a capa sempre condiz com o conteudo real do video

Tecnicamente:
- Usar `useState` para controlar se o video esta tocando ou nao
- Quando nao esta tocando, exibir o elemento `<video>` com `preload="metadata"` (que carrega o primeiro frame como preview) e um overlay com icone de play
- Ao clicar, chamar `video.play()` e esconder o overlay

### 2. Corrigir o corte do video

- Trocar `object-cover` por `object-contain` para que o video inteiro seja visivel sem corte
- Manter o `aspect-video` no container para proporcao 16:9 consistente
- O fundo preto (`bg-black`) preenchera as barras laterais/superior caso o video tenha proporcao diferente
- Funciona bem tanto em mobile quanto em desktop

### 3. Remover borda branca grossa

- A `border-4 border-white` atual cria uma moldura pesada. Substituir por `border border-gray-200` para algo mais sutil e elegante.

---

## Alteracoes tecnicas

**Arquivo:** `client/src/pages/AlemDaTendencia.tsx` (linhas 615-625)

Substituir o bloco atual do video por:

```text
<div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative group border border-gray-200">
  {!isPlaying ? (
    <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={handlePlay}>
      <video ref={videoRef} src={videoUrl} preload="metadata" className="absolute inset-0 w-full h-full object-contain" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
        <Play className="w-8 h-8 text-[#C9A84C] ml-1" />
      </div>
    </div>
  ) : (
    <video ref={videoRef} src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
  )}
</div>
```

Adicionar no componente:
- `const [isPlaying, setIsPlaying] = useState(false)`
- `const videoRef = useRef<HTMLVideoElement>(null)`
- `handlePlay` que seta `isPlaying = true`
- Import do icone `Play` do lucide-react

---

## Resultado esperado

- Capa mostra o primeiro frame real do video (conteudo de depoimentos)
- Botao de play dourado elegante centralizado
- Video exibido por completo sem corte em mobile e desktop
- Borda sutil em vez da moldura branca grossa

## Arquivo modificado

| Arquivo | Alteracao |
|---------|-----------|
| `client/src/pages/AlemDaTendencia.tsx` | Linhas 615-625: player customizado com capa do primeiro frame + object-contain + borda sutil |

