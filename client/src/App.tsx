import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

/* ─── Route-based code splitting ─── */
const Home = lazy(() => import("./pages/Home"));
const AlemDaTendencia = lazy(() => import("./pages/AlemDaTendencia"));
const Materiais = lazy(() => import("./pages/Materiais"));
const Redirecionando = lazy(() => import("./pages/Redirecionando"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade"));
const Relatorio = lazy(() => import("./pages/Relatorio"));
const Links = lazy(() => import("./pages/Links"));
const GrupoImersao = lazy(() => import("./pages/GrupoImersao"));
const RelatorioInovando = lazy(() => import("./pages/RelatorioInovando"));
const RelatorioImersaoCronograma = lazy(() => import("./pages/RelatorioImersaoCronograma"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* ─── Minimal loading fallback ─── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
      <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/alem-da-tendencia"} component={AlemDaTendencia} />
        <Route path={"/redirecionando"} component={Redirecionando} />
        <Route path={"/termos-de-uso"} component={TermosDeUso} />
        <Route path={"/politica-de-privacidade"} component={PoliticaDePrivacidade} />
        <Route path={"/relatorio-2"} component={Relatorio} />
        <Route path={"/materiais"} component={Materiais} />
        <Route path={"/links"} component={Links} />
        <Route path={"/grupo"} component={GrupoImersao} />
        <Route path={"/relatorio"} component={RelatorioInovando} />
        <Route path={"/relatorio-imersao-cronograma-obra-pronta"} component={RelatorioImersaoCronograma} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
