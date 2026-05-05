import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App, { routeFromPath, seoForPath } from "./App.jsx";

export function render(pathname) {
  const route = routeFromPath(pathname);
  const html = renderToString(
    <StrictMode>
      <App initialRoute={route} />
    </StrictMode>,
  );

  return {
    html,
    lang: route.lang,
    seo: seoForPath(pathname),
  };
}
