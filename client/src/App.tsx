import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import Dakdekken from "@/pages/services/Dakdekken";
import Dakgoten from "@/pages/services/Dakgoten";
import Daklekkage from "@/pages/services/Daklekkage";
import Dakonderhoud from "@/pages/services/Dakonderhoud";
import Dakpannen from "@/pages/services/Dakpannen";
import Dakreparatie from "@/pages/services/Dakreparatie";
import EPDM from "@/pages/services/EPDM";
import PlatteDaken from "@/pages/services/PlatteDaken";
import Schoorstenen from "@/pages/services/Schoorstenen";
import Stormschade from "@/pages/services/Stormschade";
import NotFound from "@/pages/not-found";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      
      <Route path="/over-ons">
        <Layout>
          <About />
        </Layout>
      </Route>

      <Route path="/diensten/dakdekken">
        <Layout>
          <Dakdekken />
        </Layout>
      </Route>

      <Route path="/diensten/dakgoten">
        <Layout>
          <Dakgoten />
        </Layout>
      </Route>

      <Route path="/diensten/daklekkage">
        <Layout>
          <Daklekkage />
        </Layout>
      </Route>

      <Route path="/diensten/dakonderhoud">
        <Layout>
          <Dakonderhoud />
        </Layout>
      </Route>

      <Route path="/diensten/dakpannen">
        <Layout>
          <Dakpannen />
        </Layout>
      </Route>

      <Route path="/diensten/dakreparatie">
        <Layout>
          <Dakreparatie />
        </Layout>
      </Route>

      <Route path="/diensten/epdm-dakbedekking">
        <Layout>
          <EPDM />
        </Layout>
      </Route>

      <Route path="/diensten/platte-daken">
        <Layout>
          <PlatteDaken />
        </Layout>
      </Route>

      <Route path="/diensten/schoorstenen">
        <Layout>
          <Schoorstenen />
        </Layout>
      </Route>

      <Route path="/diensten/stormschade">
        <Layout>
          <Stormschade />
        </Layout>
      </Route>

      <Route path="/admin/login">
        <AdminLogin />
      </Route>

      <Route path="/admin/dashboard">
        <AdminDashboard />
      </Route>

      <Route>
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
