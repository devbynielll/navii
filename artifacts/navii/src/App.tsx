import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NaviiProvider } from "./components/NaviiContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GlowCursor from "./components/GlowCursor";
import CommandPalette from "./components/CommandPalette";
import DemoOverlay from "./components/DemoOverlay";
import TaskSimulation from "./components/TaskSimulation";
import InteractionDemo from "./components/InteractionDemo";
import FeatureCards from "./components/FeatureCards";
import AppPreview from "./components/AppPreview";
import SafetySection from "./components/SafetySection";
import UseCases from "./components/UseCases";
import DownloadSection from "./components/DownloadSection";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      <Navbar />
      <Hero />
      <GlowCursor />
      <CommandPalette />
      <DemoOverlay />
      <TaskSimulation />
      <InteractionDemo />
      <FeatureCards />
      <AppPreview />
      <SafetySection />
      <UseCases />
      <DownloadSection />
      <FAQ />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NaviiProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </NaviiProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
