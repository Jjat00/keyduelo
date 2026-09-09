import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, Callout, H2, H3, P, Strong, Table, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';
import { REPO_URL } from '@/lib/seo/site';

export const metadata: Metadata = pageMetadata('compare', 'es');

const FAQS: Faq[] = [
  {
    q: '¿Monkeytype tiene multijugador?',
    a: 'No en el sitio principal a septiembre de 2026. Monkeytype es un test individual; un modo multijugador llamado Tribe existe como vista previa de desarrollo desde hace años, pero no forma parte de monkeytype.com. Para competir con amigos sobre un texto al estilo Monkeytype, keyduelo es la opción más cercana.',
  },
  {
    q: '¿keyduelo es una alternativa a TypeRacer?',
    a: 'Para competir con amigos, sí: creas una sala, compartes un código, compites, sin cuentas. No sustituye la clasificación pública, la biblioteca de citas ni los perfiles a largo plazo de TypeRacer, que keyduelo no tiene.',
  },
  {
    q: '¿Cuál es el mejor sitio para practicar velocidad a solas?',
    a: 'Monkeytype, por su enorme margen de personalización: muchos idiomas, modos de citas y zen, textos propios y decenas de temas. keyduelo cubre el test básico (modos tiempo y palabras, puntuación) con las mismas convenciones, lo que lo convierte en un buen calentamiento antes de una carrera.',
  },
  {
    q: '¿Estos sitios de mecanografía son gratis?',
    a: 'Los cuatro se pueden usar gratis. TypeRacer muestra anuncios y vende un nivel premium; Monkeytype muestra anuncios opcionales que se pueden apagar; keyduelo no tiene anuncios ni nivel de pago; Typer.io no documenta un nivel de pago en sus páginas públicas.',
  },
];

export default function ComparativaPage() {
  return (
    <ContentPage
      pageKey="compare"
      locale="es"
      heading="keyduelo, TypeRacer, Monkeytype y Typer.io: qué sitio de mecanografía te conviene"
      lead="Respuesta corta: Monkeytype para practicar a solas con personalización infinita, TypeRacer para carreras públicas con citas y casi dos décadas de historia, Typer.io para carreras en grupos grandes, y keyduelo cuando quieres competir con amigos en segundos sin cuenta, mirar como espectador y confiar en un temporizador del lado del servidor, todo en código abierto."
      faqs={FAQS}
    >
      <Callout title="Cómo se hizo esta comparativa">
        Los datos se verificaron en las páginas públicas de cada sitio el 9 de septiembre de 2026.
        keyduelo es nuestro propio proyecto, así que la tabla se limita a características
        verificables y no a opiniones. Si algo cambió,{' '}
        <A href={`${REPO_URL}/issues`}>abre un issue</A> y lo corregimos.
      </Callout>

      <H2 id="tabla">Comparación de características (septiembre de 2026)</H2>
      <Table
        head={['Característica', 'keyduelo', 'TypeRacer', 'Monkeytype', 'Typer.io']}
        rows={[
          ['Competir con amigos en tu propia sala', 'Sí: código de 5 letras, un clic', 'Sí: pista privada por enlace personalizado', 'No (test individual)', 'Sí: lobbies privados'],
          ['Cuenta necesaria para competir', 'No', 'Opcional (cuenta gratis para estadísticas)', 'No para tests; cuenta para el historial', 'Ofrece inicio de sesión; no documenta si es obligatorio'],
          ['Modo espectador', 'Sí, entra a cualquier sala incluso a mitad de carrera', 'No lo ofrece', 'No aplica', 'No documentado'],
          ['Origen del texto', 'Palabras comunes del inglés al azar; modo palabras o tiempo; puntuación opcional', 'Citas de libros, películas, canciones y videojuegos, de unos 20 a 930 caracteres', 'Palabras, tiempo, citas, zen y texto propio; muchos idiomas', 'Citas; texto propio en lobbies privados'],
          ['Tiempo y antitrampas', 'Texto, reloj y ranking decididos en el servidor', 'Test antitrampas tras resultados muy rápidos', 'Resultados de la clasificación validados', 'No documentado'],
          ['Temas', '5 (Dracula por defecto)', 'Limitados', 'Decenas, totalmente personalizables', 'No documentado'],
          ['Código abierto', 'Sí, GPL-3.0', 'No', 'Sí, GPL-3.0', 'No'],
          ['Anuncios', 'Ninguno', 'Anuncios; el premium los quita', 'Opcionales, se pueden apagar', 'No documentado'],
          ['Precio', 'Gratis', 'Gratis, premium opcional', 'Gratis', 'Gratis'],
          ['Lanzamiento', 'Abril de 2026', 'Marzo de 2008', '2020', 'No documentado'],
        ]}
      />

      <H2 id="keyduelo">keyduelo</H2>
      <P>
        <Strong>Qué es:</Strong> un test de mecanografía al estilo Monkeytype más salas en tiempo
        real donde los amigos escriben el mismo texto y compiten por el mayor WPM. Las salas corren
        en Durable Objects de Cloudflare; el front end es Next.js.
      </P>
      <P>
        <Strong>Ideal para:</Strong> decidir quién es el más rápido del grupo en menos de un
        minuto, calentar en clase o en el equipo, y mirar una carrera como espectador.
      </P>
      <P>
        <Strong>Ten en cuenta:</Strong> es un proyecto joven (abril de 2026). Solo lista de
        palabras en inglés, todavía sin cuentas, historial ni clasificaciones, y cinco temas en
        lugar de decenas.
      </P>

      <H2 id="typeracer">TypeRacer</H2>
      <P>
        <Strong>Qué es:</Strong> la carrera de mecanografía online original, lanzada en marzo de
        2008. Los jugadores escriben citas de libros, películas, canciones y videojuegos mientras
        unos autos avanzan por la pista, y cada error debe corregirse antes de continuar.
      </P>
      <P>
        <Strong>Ideal para:</Strong> carreras con citas contra desconocidos, perfiles a largo
        plazo y una clasificación global con casi dos décadas de resultados.
      </P>
      <P>
        <Strong>Ten en cuenta:</Strong> anuncios salvo que pagues el premium, y las citas con
        puntuación y mayúsculas completas hacen que sus cifras de WPM sean más bajas que las de
        los tests con listas de palabras.
      </P>

      <H2 id="monkeytype">Monkeytype</H2>
      <P>
        <Strong>Qué es:</Strong> el test de mecanografía minimalista de referencia, de código
        abierto bajo GPL-3.0 con más de 20.000 estrellas en GitHub. Modos de tiempo, palabras,
        citas, zen y texto propio, muchos idiomas y una biblioteca enorme de temas.
      </P>
      <P>
        <Strong>Ideal para:</Strong> practicar a solas con todos los ajustes posibles y una cuenta
        que guarda tu historial.
      </P>
      <P>
        <Strong>Ten en cuenta:</Strong> no hay carreras con amigos en el sitio principal. keyduelo
        toma prestadas sus convenciones (palabras de cinco caracteres, WPM neto y bruto, errores
        persistentes), así que puedes calentar allí y competir aquí con cifras comparables.
      </P>

      <H2 id="typer">Typer.io</H2>
      <P>
        <Strong>Qué es:</Strong> un sitio de carreras de mecanografía multijugador con partidas
        públicas y juego en grupo con amigos, incluido texto propio en lobbies privados.
      </P>
      <P>
        <Strong>Ideal para:</Strong> carreras en grupos grandes.
      </P>
      <P>
        <Strong>Ten en cuenta:</Strong> código cerrado y menos detalles públicos sobre cuentas,
        tiempos o anuncios que los otros tres.
      </P>

      <H2 id="elegir">Cómo elegir</H2>
      <Ul>
        <li>
          Quieres competir con amigos ahora mismo, sin registros:{' '}
          <A href="/es/carrera-de-mecanografia-multijugador">keyduelo</A>.
        </li>
        <li>Quieres citas, desconocidos y una clasificación global: TypeRacer.</li>
        <li>Quieres practicar a solas con todos los ajustes imaginables: Monkeytype.</li>
        <li>Quieres una carrera con muchísima gente: Typer.io.</li>
      </Ul>

      <H3 id="alternativa">¿keyduelo es una alternativa a TypeRacer?</H3>
      <P>
        Para el caso de &quot;competir con mis amigos&quot;, sí, y con menos fricción: sin cuenta,
        un código de 5 letras en lugar de un enlace a una pista privada, espectadores en vivo y un
        temporizador del lado del servidor. Para clasificaciones públicas, citas y perfiles,
        TypeRacer sigue siendo la referencia.
      </P>
    </ContentPage>
  );
}
