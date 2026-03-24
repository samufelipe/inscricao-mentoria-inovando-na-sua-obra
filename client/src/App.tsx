import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AlemDaTendencia from "./pages/AlemDaTendencia";
import Redirecionando from "./pages/Redirecionando";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import Relatorio from "./pages/Relatorio";
import Materiais from "./pages/Materiais";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/alem-da-tendencia"} component={AlemDaTendencia} />
      <Route path={"/redirecionando"} component={Redirecionando} />
      <Route path={"/termos-de-uso"} component={TermosDeUso} />
      <Route path={"/politica-de-privacidade"} component={PoliticaDePrivacidade} />
      <Route path={"/relatorio-2"} component={Relatorio} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
