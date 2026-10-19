import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import "./styles.css";
import { I18nProvider } from "./lib/i18n";
import { auth } from "./lib/api";
import { Login } from "./routes/Login";
import { ResetPassword } from "./routes/ResetPassword";
import { Home } from "./routes/Home";
import { NewTrip } from "./routes/NewTrip";
import { Join } from "./routes/Join";
import { TripLayout } from "./routes/TripLayout";
import { Expenses } from "./routes/Expenses";
import { Balances } from "./routes/Balances";
import { SettlementView } from "./routes/SettlementView";
import { Group } from "./routes/Group";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: true } } });

function RequireAuth() {
  const { data, isPending } = auth.useSession();
  const loc = useLocation();
  if (isPending) return <div className="min-h-[100dvh]" />;
  if (!data) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace />;
  return <Outlet />;
}

const router = createBrowserRouter(
  [
    { path: "/login", element: <Login /> },
    { path: "/reset", element: <ResetPassword /> },
    // se puede entrar con código sin cuenta: la pantalla crea un invitado al elegir un nombre
    { path: "/join/:code?", element: <Join /> },
    {
      element: <RequireAuth />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/new", element: <NewTrip /> },
        {
          path: "/t/:tripId",
          element: <TripLayout />,
          children: [
            { index: true, element: <Expenses /> },
            { path: "balances", element: <Balances /> },
            { path: "s/:settlementId", element: <SettlementView /> },
            // recharts es pesado: se carga solo al abrir el resumen
            { path: "summary", lazy: () => import("./routes/Summary").then((m) => ({ Component: m.Summary })) },
            { path: "group", element: <Group /> },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
  { basename: "/app" },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nProvider>
    </MotionConfig>
  </StrictMode>,
);
