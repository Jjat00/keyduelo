import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, H2, P, Strong, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';
import { AUTHOR, REPO_URL } from '@/lib/seo/site';

export const metadata: Metadata = pageMetadata('about', 'es');

const FAQS: Faq[] = [
  {
    q: '¿keyduelo es gratis?',
    a: 'Sí, por completo. No hay nivel premium, ni anuncios, ni cuenta. Corre en los planes gratuitos de Vercel y Cloudflare y su código fuente es público.',
  },
  {
    q: '¿keyduelo es de código abierto?',
    a: 'Sí, bajo licencia GPL-3.0, la misma que Monkeytype. El repositorio github.com/Jjat00/keyduelo contiene el front end en Next.js, el Worker de Cloudflare con los Durable Objects y el motor de tipeo compartido.',
  },
  {
    q: '¿keyduelo tiene relación con Monkeytype o TypeRacer?',
    a: 'No. keyduelo es un proyecto independiente inspirado en el diseño de Monkeytype. No contiene código de Monkeytype ni usa su nombre o logo; el motor, los hooks, el worker y el protocolo se escribieron desde cero.',
  },
  {
    q: '¿Por qué se llama keyduelo?',
    a: '"Key" por teclado (keyboard) y "duelo" por duelo: un duelo de teclado. El proyecto se publicó en abril de 2026 con un nombre provisional y pasó a llamarse keyduelo cuando llegaron las salas públicas.',
  },
  {
    q: '¿Cómo reporto un error o propongo una función?',
    a: 'Abre un issue en GitHub. Los pull requests son bienvenidos; el README documenta la arquitectura, la configuración local y las decisiones técnicas.',
  },
];

export default function AcercaDePage() {
  return (
    <ContentPage
      pageKey="about"
      locale="es"
      heading="Acerca de keyduelo"
      lead="keyduelo es una carrera de mecanografía gratuita y de código abierto: un test al estilo Monkeytype para practicar a solas y salas en tiempo real donde los amigos escriben el mismo texto y compiten por el mayor WPM. Lo creó Jaime Aza y se publicó por primera vez en abril de 2026."
      faqs={FAQS}
    >
      <H2 id="que-es">Qué es keyduelo</H2>
      <P>
        keyduelo es una aplicación web con dos pantallas. La página principal es un test de
        mecanografía que arranca con tu primera pulsación y reporta WPM, WPM bruto y precisión. La
        página play es un lobby donde cualquiera crea una sala, comparte un código de 5 letras y
        compite con amigos sobre el mismo texto, con barras de progreso en vivo, cuenta regresiva
        sincronizada y un ranking calculado en el servidor. No hay cuentas, ni anuncios, ni rastreo.
      </P>

      <H2 id="quien">Quién lo construye</H2>
      <P>
        keyduelo es un proyecto personal de <A href={AUTHOR.url}>{AUTHOR.name}</A>, ingeniero de
        software colombiano que construye productos web con Next.js, Django y agentes de IA. No es
        una empresa. El código, las decisiones y los errores están documentados en abierto en{' '}
        <A href={REPO_URL}>github.com/Jjat00/keyduelo</A>.
      </P>

      <H2 id="stack">Cómo está construido</H2>
      <Ul>
        <li>
          <Strong>Front end:</Strong> Next.js 16 con App Router, React 19 y Tailwind CSS 4,
          desplegado en Vercel.
        </li>
        <li>
          <Strong>Salas:</Strong> un Worker de Cloudflare con Durable Objects. Un objeto por sala
          guarda los jugadores, el texto, el reloj y el ranking; un registro único alimenta el lobby
          público.
        </li>
        <li>
          <Strong>Tiempo real:</Strong> WebSockets con hibernación, así que una sala inactiva no
          cuesta nada.
        </li>
        <li>
          <Strong>Motor de tipeo:</Strong> una máquina de estados en TypeScript puro, compartida por
          navegador y servidor, sin React dentro, para que el mismo código pueda validar resultados.
        </li>
        <li>
          <Strong>Texto:</Strong> un generador sobre 282 palabras comunes del inglés con puntuación
          opcional, que evita repetir la misma palabra dos veces seguidas.
        </li>
      </Ul>

      <H2 id="privacidad">Privacidad</H2>
      <P>
        No hay nada que registrar y nada se rastrea. Tu tema, tu sonido y tus ajustes del test
        viven en el almacenamiento local de tu navegador, igual que tu apodo. Los tests individuales
        nunca salen de tu dispositivo. En una sala, tu navegador envía contadores de progreso
        (posición y WPM) al servidor de la sala, nunca las teclas que pulsas, y la sala desaparece
        de la memoria cuando el anfitrión se va.
      </P>

      <H2 id="licencia">Inspiración y licencia</H2>
      <P>
        keyduelo está inspirado en <A href="https://monkeytype.com">Monkeytype</A>: el texto que
        se desplaza, el cursor, las métricas y el tono en minúsculas vienen de allí. No incluye
        código de Monkeytype; el motor, los hooks, los componentes, el worker y el protocolo se
        escribieron desde cero y la lista de palabras es una selección propia. Las paletas Nord,
        Dracula y Gruvbox se usan bajo sus licencias MIT. keyduelo se publica bajo{' '}
        <A href="https://www.gnu.org/licenses/gpl-3.0.html">GPL-3.0</A>.
      </P>

      <H2 id="futuro">Qué podría venir después</H2>
      <P>
        En estudio, sin orden particular: listas de palabras en otros idiomas (español primero),
        textos propios para las salas, y cuentas opcionales con historial y clasificaciones. Nada
        de esto es una promesa; el README del repositorio registra lo que realmente se publica.
      </P>

      <H2 id="contacto">Contacto y contribuciones</H2>
      <P>
        Errores, ideas y pull requests van a{' '}
        <A href={`${REPO_URL}/issues`}>los issues de GitHub</A>. El README explica la arquitectura,
        la configuración local con pnpm y wrangler, y el razonamiento detrás de las principales
        decisiones técnicas.
      </P>
    </ContentPage>
  );
}
