---
name: auditoria-seo-base
description: "Auditoria SEO basica para detectar bloqueos claros de indexacion, metadatos, estructura, imagenes, schema y conversion en una web pequena. Pensada como diagnostico rapido antes de invertir en SEO o Google Ads."
price_reference: "150 EUR"
scope: "Hasta 5 URLs clave"
---

# Auditoria SEO Base

## Objetivo

Detectar si una web tiene problemas evidentes que impiden posicionar, indexar o convertir visitas en contactos. Es una auditoria breve, realista y accionable: no busca cubrir todo el negocio, sino encontrar los bloqueos mas importantes.

La plantilla original `03-auditoria-seo.md` es buena base tecnica, pero para una auditoria basica conviene acotarla. Esta version reduce alcance, evita comparativas complejas y prioriza correcciones de impacto inmediato.

## Cuándo Usarla

- Antes de lanzar una campana pequena de Google Ads.
- Cuando una web no aparece en Google o no recibe contactos.
- Para validar una home, una landing, una pagina de servicios y 2 URLs importantes.
- Cuando el cliente necesita una primera orientacion sin entrar aun en estrategia completa.

## Alcance

- Hasta 5 URLs clave.
- Sin auditoria de competidores.
- Sin investigacion profunda de keywords.
- Sin auditoria completa de contenidos.
- Sin analisis avanzado de Core Web Vitals mas alla de senales basicas observables.

## Preguntas Iniciales

Pedir al cliente:

- URL principal.
- Hasta 4 URLs adicionales si quiere incluirlas.
- Objetivo de la web: captar leads, vender, informar, posicionar marca, recibir llamadas.
- Idiomas de la web.
- 1-3 keywords o busquedas prioritarias si las conoce.
- Si tiene Search Console disponible. En base no es obligatorio.

## Revision Tecnica Minima

Para cada URL revisada:

- Codigo HTTP y redirecciones.
- HTTPS.
- Title.
- Meta description.
- Canonical.
- Meta robots.
- H1.
- Jerarquia principal H2/H3.
- Idioma HTML.
- Indexabilidad visible.
- Open Graph basico.
- Schema JSON-LD si existe.
- Imagenes principales y atributos `alt`.
- Enlaces internos importantes.
- CTA principal.

Para dominio:

- `robots.txt`.
- `sitemap.xml`.
- Redireccion http a https.
- Redireccion www/no-www.
- Favicon.

## Puntuacion

Puntuar de 0 a 100 con pesos simplificados:

- Indexacion y tecnica: 25%.
- Metadatos y canonicals: 20%.
- Headings y estructura: 15%.
- Imagenes y alts: 10%.
- Schema y social tags: 10%.
- Contenido minimo y claridad: 10%.
- Conversion basica: 10%.

## Entregable

Un documento breve en PDF/HTML/Markdown con:

1. Puntuacion global.
2. Estado por categoria.
3. Top 10 problemas encontrados.
4. Top 5 acciones prioritarias.
5. Tabla de URLs revisadas.
6. Checklist de correcciones.

## Criterio de Prioridad

Clasificar cada hallazgo como:

- Critico: bloquea indexacion, rastreo, acceso, canonical o conversion esencial.
- Alto: afecta CTR, relevancia, estructura o confianza.
- Medio: mejora SEO pero no bloquea.
- Bajo: detalle recomendable.

## Formato de Hallazgo

Cada hallazgo debe incluir:

- Problema concreto.
- URL afectada.
- Evidencia observada.
- Por que importa.
- Como corregirlo.
- Prioridad.

Ejemplo:

```md
Prioridad: Alta
URL: https://ejemplo.com/servicios/
Problema: La meta description tiene 82 caracteres y no explica el servicio principal.
Impacto: Puede reducir el CTR en resultados de busqueda.
Correccion: Ampliar a 145-160 caracteres incluyendo servicio, ubicacion y beneficio.
```

## Herramientas Recomendadas

- Navegador.
- `curl -I`.
- Inspeccion del HTML.
- Rich Results Test.
- PageSpeed Insights si se quiere una comprobacion rapida externa.
- Search Console solo si el cliente ya lo tiene accesible.

## Dashboard Visual

Generar un archivo HTML autocontenido (`auditoria-base-[dominio].html`) con:

1. **Header** — URL auditada, fecha, puntuacion global en circulo grande. Color segun resultado: verde (80+), amarillo (50-79), rojo (<50).
2. **Resumen ejecutivo** — 4 tarjetas: puntuacion global, problemas criticos, advertencias, tests aprobados.
3. **Top 5 acciones prioritarias** — Cada una con: que esta mal, por que importa, como corregirlo (con codigo o instruccion clara).
4. **Checklist visual** — Tabla con todas las verificaciones y estado (aprobado / advertencia / error).
5. **Tabla de URLs revisadas** — URL, title, description, H1, puntuacion individual.

### Requisitos

- Responsive.
- Autocontenido (CSS y JS inline, sin dependencias externas).
- Imprimible (que al exportar PDF se vea bien).
- Abrir automaticamente en el navegador tras generarlo.

## Resultado Esperado

El cliente debe saber:

- Si Google puede rastrear e indexar la web.
- Si los snippets son competitivos.
- Si las paginas principales tienen estructura minima.
- Que 5 acciones debe hacer primero.
- Si le conviene pasar a auditoria Standard.

