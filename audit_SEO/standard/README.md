---
name: auditoria-seo-standard
description: "Auditoria SEO standard para revisar tecnica, contenidos, intencion de busqueda, arquitectura, conversion y oportunidades long-tail en una web pequena o mediana."
price_reference: "400 EUR"
scope: "Hasta 15 URLs clave"
---

# Auditoria SEO Standard

## Objetivo

Entregar una auditoria completa y accionable para mejorar posicionamiento organico, preparar campanas de Google Ads y ordenar prioridades reales de implementacion. Es el paquete recomendado para la mayoria de webs de empresa.

## Cuándo Usarla

- Antes de invertir de forma continuada en SEO o Google Ads.
- Despues de un rediseño web.
- Cuando Search Console muestra paginas descubiertas/no indexadas.
- Cuando la web tiene servicios, blog o landings pero no genera trafico cualificado.
- Cuando se necesita decidir que contenido crear durante los proximos meses.

## Alcance

- Hasta 15 URLs clave.
- Revision de home, servicios, landings, contacto, blog principal y entradas relevantes.
- Revision tecnica y semantica.
- Analisis basico de keywords long-tail.
- Revision de conversion y llamadas a la accion.
- Recomendaciones de schema.
- Plan de accion priorizado.

## Informacion Inicial Necesaria

Pedir:

- URL principal.
- Objetivo comercial.
- Servicios principales.
- Zona geografica prioritaria.
- Idiomas.
- Competidores conocidos, si existen.
- Acceso o capturas de Search Console, si hay.
- Acceso o capturas de Analytics/GA4, si hay.
- Keywords deseadas o preguntas frecuentes del cliente.

## Auditoria Tecnica

Revisar:

- HTTP status.
- HTTPS y redirecciones.
- Canonicals.
- `robots.txt`.
- `sitemap.xml`.
- Arquitectura de URLs.
- Hreflang si hay idiomas.
- HTML lang.
- Meta robots.
- Duplicidades de title y description.
- Paginacion si aplica.
- Errores 404 internos.
- Enlaces internos y profundidad de clic.
- Favicon y assets basicos.
- Peso aproximado de pagina.
- Recursos bloqueantes evidentes.

## Auditoria On-Page

Por cada URL:

- Title: longitud, keyword, marca, unicidad.
- Meta description: longitud, CTR, promesa, keyword, unicidad.
- H1 unico.
- H2/H3 con estructura logica.
- Primer parrafo claro.
- Contenido suficiente y especifico.
- Entidades relevantes.
- Enlaces internos hacia paginas importantes.
- Imagenes con `alt` descriptivo.
- CTAs visibles y coherentes.
- Pruebas de confianza: clientes, casos, FAQ, ubicacion, datos reales.

## Auditoria de Contenido e Intencion

Clasificar cada URL segun intencion:

- Informacional.
- Comercial.
- Transaccional.
- Marca.
- Local.

Detectar:

- Paginas demasiado genericas.
- Servicios mezclados en una sola URL.
- Keywords long-tail no cubiertas.
- Canibalizaciones.
- Blogs sin enlace a servicios.
- Falta de casos, precios orientativos, FAQ o ejemplos.

## Auditoria de Conversion

Revisar:

- CTA principal.
- CTA secundario.
- Formulario.
- Claridad del mensaje.
- Objeciones no respondidas.
- Pruebas visuales.
- Camino hacia contacto.
- Coherencia entre landing y anuncio si hay Google Ads.
- Medicion basica de eventos: envio de formulario, click email, click telefono, click WhatsApp si existe.

## Schema y Datos Estructurados

Revisar y recomendar:

- Organization / LocalBusiness / ProfessionalService.
- WebSite.
- BreadcrumbList.
- Article / BlogPosting.
- FAQPage.
- Service.
- VideoObject.
- ImageObject cuando sea relevante.

Validar:

- JSON valido.
- Campos obligatorios.
- Coherencia con contenido visible.
- No duplicar schemas contradictorios.

## Competencia Ligera

Si el cliente aporta 1-2 competidores:

- Comparar titles.
- Comparar estructura de servicios.
- Comparar profundidad de contenido.
- Comparar claridad de oferta.
- Detectar oportunidades no cubiertas.

No es una investigacion completa de mercado; es una comparativa tactica.

## Puntuacion

Puntuar de 0 a 100:

- Tecnico e indexacion: 20%.
- Metadatos y snippets: 15%.
- Arquitectura y enlaces internos: 15%.
- Contenido e intencion de busqueda: 20%.
- Schema y social: 10%.
- Imagenes y accesibilidad: 10%.
- Conversion y medicion: 10%.

## Entregable

Documento completo con:

1. Resumen ejecutivo.
2. Puntuacion global.
3. Diagnostico por categoria.
4. Tabla de URLs auditadas.
5. Hallazgos priorizados.
6. Quick wins.
7. Problemas criticos.
8. Oportunidades long-tail.
9. Recomendaciones de nuevas paginas o landings.
10. Recomendaciones de blog.
11. Recomendaciones de schema.
12. Roadmap de 30 dias.

## Roadmap de 30 Dias

Separar acciones:

- Semana 1: bloqueos tecnicos y metadatos criticos.
- Semana 2: mejoras de contenido en paginas comerciales.
- Semana 3: enlaces internos, schema, FAQ y CTAs.
- Semana 4: nuevas piezas long-tail y medicion.

## Dashboard Visual

Generar un archivo HTML autocontenido (`auditoria-standard-[dominio].html`) con:

1. **Header** — URL auditada, fecha, puntuacion global en circulo grande con color: verde (80+), amarillo (50-79), rojo (<50).
2. **Resumen ejecutivo** — 4 tarjetas: puntuacion global, problemas criticos, advertencias, tests aprobados.
3. **Top 5 correcciones prioritarias** — Ordenadas por impacto. Cada una con: que esta mal (concreto), por que importa (impacto en Google), como corregirlo (codigo exacto o instruccion clara).
4. **Desglose por categoria** — Las 7 categorias con:
   - Barra de progreso visual con puntuacion numerica.
   - Lista de hallazgos con icono de estado (aprobado / advertencia / error).
   - Recomendacion para cada problema.
5. **Tabla de URLs auditadas** — URL, title, description, H1, estado general.
6. **Quick wins** — Seccion visual con las correcciones de impacto inmediato.
7. **Oportunidades long-tail** — Tabla con keywords sugeridas, intencion y accion recomendada.
8. **Roadmap 30 dias** — Timeline visual con las 4 semanas y tareas asignadas.
9. **Comparativa con competidores** — Solo si se proporcionaron URLs. Tabla lado a lado por categoria.
10. **Detalle tecnico completo** — Seccion expandible/colapsable con todos los hallazgos.

### Requisitos

- Responsive (se ve bien en movil y desktop).
- Autocontenido (CSS y JS inline, sin dependencias externas).
- Imprimible (que al exportar PDF se vea bien).
- Con navegacion interna (links a cada seccion desde un indice).
- Abrir automaticamente en el navegador tras generarlo.

## Resultado Esperado

El cliente debe salir con:

- Una lista ordenada de que arreglar.
- Una vision clara de que paginas necesita.
- Una base preparada para SEO y Google Ads.
- Criterio para decidir si necesita implementacion o un plan premium.

