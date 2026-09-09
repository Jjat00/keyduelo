import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, H2, P, Steps, Strong, Table, Ul } from '@/components/seo/Prose';
import { howToSchema, type Faq } from '@/lib/seo/jsonld';
import { getPage, pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata('race', 'es');

const PAGE = getPage('race').es;

const STEPS = [
  {
    name: 'Abre el lobby',
    text: 'Entra en keyduelo.vercel.app/play. La lista de salas activas se actualiza cada 2 segundos.',
  },
  {
    name: 'Elige un apodo (opcional)',
    text: 'Si lo dejas vacío recibes un nombre de invitado como guest4821. Solo se guarda en tu navegador.',
  },
  {
    name: 'Crea una sala',
    text: 'Pulsa "create new room". Recibes un código de 5 caracteres (letras de la A a la Z y dígitos del 2 al 9, sin los ambiguos I, O, 0 y 1) y te conviertes en anfitrión.',
  },
  {
    name: 'Invita a tus amigos',
    text: 'Usa el botón de copiar enlace o copiar código en la cabecera de la sala y pégalo en el chat del grupo. Quien abra el enlace entra al instante, sin registrarse.',
  },
  {
    name: 'Configura la carrera',
    text: 'Como anfitrión eliges palabras (10 a 100) o tiempo (15 a 60 segundos) y si el texto lleva puntuación. Todos en la sala ven el cambio en vivo.',
  },
  {
    name: 'Arranca',
    text: 'Pulsa start. Una cuenta regresiva 3-2-1 sincronizada corre en todas las pantallas a la vez.',
  },
  {
    name: 'Compite',
    text: 'Escribe. Cada jugador tiene una barra de progreso relativa al líder, refrescada cada 150 milisegundos aproximadamente.',
  },
  {
    name: 'Resultados y revancha',
    text: 'El ranking muestra WPM, precisión y tiempo de cada jugador. El anfitrión pulsa "next race" para repetir con un texto nuevo.',
  },
];

const FAQS: Faq[] = [
  {
    q: '¿Cuántas personas pueden entrar en una sala?',
    a: 'No hay un tope fijo en el servidor de la sala. Cada sala corre en su propio Durable Object de Cloudflare y cada participante añade una conexión WebSocket. Los grupos de 2 a 20 personas son el punto ideal para que las barras de progreso se lean bien.',
  },
  {
    q: '¿Mis amigos necesitan una cuenta para competir?',
    a: 'No. Quien abre el enlace de la sala o escribe el código de 5 caracteres en el lobby entra de inmediato. Si no pone apodo, keyduelo le asigna un nombre de invitado.',
  },
  {
    q: '¿Puedo ver una carrera sin jugar?',
    a: 'Sí. Usa el botón spectate en cualquier sala del lobby, o entra en una sala que ya esté corriendo: se abre en modo espectador con las barras de progreso en vivo y la cuenta regresiva sincronizada.',
  },
  {
    q: '¿Qué pasa si el anfitrión se desconecta?',
    a: 'La sala se cierra y todos los jugadores y espectadores vuelven al lobby con un aviso. Cualquiera puede crear una sala nueva en un clic. Si el anfitrión solo recarga la pestaña, conserva el rol gracias a un token guardado en su navegador.',
  },
  {
    q: '¿La distancia o la latencia afectan el resultado?',
    a: 'Tu WPM se calcula con tus propias pulsaciones en tu propio navegador y se envía a la sala como contadores de progreso, así que una conexión lenta retrasa lo que ven los demás, no tu puntuación. En modo tiempo el reloj del servidor fija el mismo inicio y fin para todos.',
  },
  {
    q: '¿Puedo competir contra un bot o usar mi propio texto?',
    a: 'Todavía no. Las carreras de keyduelo son entre personas sobre un texto generado a partir de 282 palabras comunes del inglés, con puntuación opcional. Para practicar en solitario, el test de la página principal es el lugar.',
  },
];

export default function CarreraPage() {
  return (
    <ContentPage
      pageKey="race"
      locale="es"
      heading="Carrera de mecanografía multijugador: compite con tus amigos con un código de 5 letras"
      lead="Crea una sala en un clic, comparte el código o el enlace, y todos escriben exactamente el mismo texto en el mismo instante. Las barras de progreso se actualizan en vivo, el servidor lleva el reloj y gana el mayor WPM. Nadie necesita cuenta."
      faqs={FAQS}
      schema={[
        howToSchema({
          name: 'Cómo empezar una carrera de mecanografía con amigos en keyduelo',
          description: PAGE.description,
          path: PAGE.path,
          totalTime: 'PT1M',
          steps: STEPS,
        }),
      ]}
    >
      <H2 id="como-empezar">Cómo empezar una carrera de mecanografía con amigos</H2>
      <Steps steps={STEPS} />

      <H2 id="ranking">Cómo funciona el ranking</H2>
      <P>
        Las reglas las aplica el servidor de la sala, no tu navegador, así que nadie gana editando
        un reloj local o un mensaje de progreso.
      </P>
      <Ul>
        <li>
          <Strong>Modo tiempo:</Strong> todos paran en el mismo instante de reloj. El ranking es por
          WPM; la precisión desempata.
        </li>
        <li>
          <Strong>Modo palabras:</Strong> quienes terminan todo el texto van primero, gana el menor
          tiempo. Quienes no terminaron se ordenan por WPM.
        </li>
        <li>
          El texto, la hora de inicio y el ranking final los decide un Durable Object de Cloudflare
          por sala. Los clientes solo reportan su progreso.
        </li>
      </Ul>

      <H2 id="roles">Anfitrión, jugadores y espectadores</H2>
      <Table
        head={['Rol', 'Cómo lo obtienes', 'Puede', 'No puede']}
        rows={[
          ['anfitrión', 'Creaste la sala', 'Cambiar la configuración, iniciar, expulsar jugadores, lanzar la siguiente carrera', 'Ceder el rol a otra persona'],
          ['jugador', 'Entraste a una sala en lobby', 'Marcar listo, competir, ver las estadísticas de todos', 'Cambiar la configuración, iniciar, expulsar'],
          ['espectador', 'Elegiste spectate o entraste a una sala ya en carrera', 'Ver barras de progreso, cuenta regresiva y resultados', 'Escribir, marcar listo, aparecer en el ranking'],
        ]}
      />
      <P>
        Si el anfitrión se va, la sala se cierra y todos vuelven al lobby con un aviso. No hay
        traspasos confusos: una sala nueva está a un clic.
      </P>

      <H2 id="salas-publicas">Salas públicas y modo espectador</H2>
      <P>
        El lobby lista cada sala activa con su anfitrión, modo, número de jugadores y estado. Las
        salas en lobby aceptan jugadores; las que ya están en carrera aceptan espectadores, así que
        quien llega tarde puede ver el final. Cualquiera puede entrar a una sala listada, así que
        comparte el código con quienes quieras en la carrera y arranca en cuanto estén dentro.
      </P>

      <H2 id="por-que">Por qué competir en keyduelo</H2>
      <Ul>
        <li>
          <Strong>Cero fricción:</Strong> sin cuentas, sin descargas, un clic para la sala, un enlace
          para invitar.
        </li>
        <li>
          <Strong>Justo por diseño:</Strong> texto, temporizador y ranking decididos en el servidor.
        </li>
        <li>
          <Strong>Espectadores bienvenidos:</Strong> entra a mitad de carrera y mira.
        </li>
        <li>
          <Strong>Configuración en vivo:</Strong> el anfitrión cambia el modo o la puntuación y todos
          lo ven al instante.
        </li>
        <li>
          <Strong>Sensación Monkeytype:</Strong> texto que se desplaza, cursor suave, cinco temas y
          sonidos de tecla opcionales.
        </li>
        <li>
          <Strong>Gratis y de código abierto</Strong> (GPL-3.0), sin anuncios ni rastreo.
        </li>
      </Ul>

      <H2 id="limites">Límites actuales</H2>
      <Ul>
        <li>Las salas son efímeras: cuando el anfitrión se va, la sala se cierra y no se guarda nada.</li>
        <li>Todavía no hay cuentas, historial ni tablas de clasificación.</li>
        <li>Solo lista de palabras en inglés; la interfaz está en inglés.</li>
        <li>Las salas son visibles en el lobby público.</li>
        <li>
          No hay bots contra los que competir: para practicar a solas usa el{' '}
          <A href="/es/test-de-mecanografia">test de mecanografía</A>.
        </li>
      </Ul>
    </ContentPage>
  );
}
