import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, Formula, H2, Kbd, Ol, P, Strong, Table, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata('typingTest', 'es');

const FAQS: Faq[] = [
  {
    q: '¿El test de mecanografía de keyduelo es gratis y sin registro?',
    a: 'Sí. Abres keyduelo y empiezas a escribir: no hay cuenta, ni muro de pago, ni anuncios. Todo el proyecto es software libre bajo licencia GPL-3.0, así que puedes leer exactamente cómo funciona el test.',
  },
  {
    q: '¿Por qué mi WPM es distinto al de Monkeytype o TypeRacer?',
    a: 'Cada sitio usa textos, temporizadores y reglas de error diferentes. keyduelo sigue las convenciones de Monkeytype: cinco caracteres por palabra, el WPM neto cuenta solo los caracteres correctos y un error sigue contando aunque lo corrijas con Retroceso. TypeRacer usa citas largas y te bloquea hasta corregir cada error, lo que da cifras más bajas. Compara resultados solo dentro del mismo sitio y con la misma configuración.',
  },
  {
    q: '¿Qué duración de test debo usar?',
    a: 'Usa 15 segundos para intentos rápidos y calentamiento, y 60 segundos o 100 palabras para un resultado más cercano a tu velocidad sostenida. Los tests cortos suelen dar cifras más altas porque no da tiempo a cansarse, así que elige una configuración y mantenla cuando midas tu progreso.',
  },
  {
    q: '¿Puedo hacer el test de mecanografía en español?',
    a: 'Por ahora la lista de palabras está solo en inglés, pero el test no exige comprensión lectora: escribes lo que ves. Las guías en español están en keyduelo.vercel.app/es y las listas de palabras en otros idiomas están en estudio.',
  },
  {
    q: '¿Funciona en el celular o la tableta?',
    a: 'Carga en cualquier navegador móvil moderno, pero los teclados en pantalla autocorrigen y no dan la respuesta táctil de las teclas físicas, así que esos resultados no son comparables con los de escritorio. Para una medición justa usa un teclado físico.',
  },
  {
    q: '¿Se envía a un servidor lo que escribo?',
    a: 'No. En el modo individual el texto se genera en tu navegador y las métricas se calculan ahí mismo. keyduelo no tiene scripts de analítica y solo guarda tus ajustes localmente. Las salas multijugador usan un WebSocket, pero intercambian contadores de progreso, nunca tus pulsaciones.',
  },
];

export default function TestMecanografiaPage() {
  return (
    <ContentPage
      pageKey="typingTest"
      locale="es"
      heading="Test de mecanografía gratis: mide tus palabras por minuto en 15 segundos, sin registro"
      lead="keyduelo abre directamente en el test. Pulsas cualquier tecla y arranca el temporizador de 15 segundos; al terminar ves tres cifras: WPM (palabras por minuto netas), WPM bruto y precisión. Sin cuenta, sin anuncios, y tus ajustes se quedan en tu navegador."
      faqs={FAQS}
    >
      <H2 id="como-funciona">Cómo funciona el test de mecanografía de keyduelo</H2>
      <P>
        El test muestra una secuencia de palabras aleatorias tomadas de una lista de{' '}
        <Strong>282 de las palabras más comunes del inglés</Strong>, de modo que mide qué tan
        rápido escribes, no cuántas palabras raras conoces. El temporizador arranca con tu primera
        pulsación, no al cargar la página. Un carácter erróneo se marca en rojo y el cursor avanza
        igual; con <Kbd>Retroceso</Kbd> lo corriges. Cuando se acaba el tiempo o las palabras,
        aparecen los resultados.
      </P>
      <Ul>
        <li>
          <Strong>Modo tiempo:</Strong> 15, 30 o 60 segundos. 15 segundos es el valor por defecto.
        </li>
        <li>
          <Strong>Modo palabras:</Strong> 10, 25, 50 o 100 palabras.
        </li>
        <li>
          <Strong>Puntuación:</Strong> añade mayúsculas, comas y puntos para un texto más difícil y
          realista.
        </li>
        <li>
          <Kbd>Tab</Kbd> o <Kbd>Esc</Kbd>: texto nuevo en cualquier momento.
        </li>
        <li>Los ajustes se guardan en tu navegador y se restauran en la siguiente visita.</li>
      </Ul>

      <H2 id="formula">Cómo se calcula el WPM aquí</H2>
      <P>
        keyduelo usa la definición estándar: <Strong>una palabra equivale a cinco caracteres</Strong>,
        espacios incluidos. El WPM neto cuenta solo los caracteres que escribiste bien; el WPM
        bruto cuenta todas las pulsaciones; la precisión es la proporción de pulsaciones correctas.
        Retroceso no perdona errores: corregir cuesta tiempo y el error sigue restando precisión.
      </P>
      <Formula>{`wpm       = caracteres correctos / 5 / minutos
wpm bruto = todas las pulsaciones / 5 / minutos
precisión = (pulsaciones - errores) / pulsaciones × 100`}</Formula>
      <P>
        La explicación completa, con velocidades promedio de la investigación publicada y
        referencias, está en <A href="/es/palabras-por-minuto">Qué es WPM</A>.
      </P>

      <H2 id="resultado">Qué significa tu resultado</H2>
      <P>
        Usa esta escala como primera orientación. Es la escala editorial de keyduelo (septiembre
        de 2026), alineada con los rangos que suelen usar los instructores de mecanografía; en la
        guía de WPM está la investigación detrás de la franja &quot;promedio&quot;.
      </P>
      <Table
        caption="Escala de keyduelo para un test de 15 a 60 segundos sin puntuación"
        head={['WPM', 'Nivel', 'Qué suele significar']}
        rows={[
          ['menos de 30', 'principiante', 'Todavía miras el teclado. Trabaja la posición de los dedos y la precisión antes que la velocidad.'],
          ['30 a 50', 'promedio', 'Cerca del promedio de quien usa el computador a diario. La constancia es la siguiente mejora.'],
          ['50 a 70', 'sólido', 'Mecanografía al tacto cómoda. Más rápido que la mayoría de tus rivales.'],
          ['70 a 100', 'rápido', 'Competitivo en casi cualquier sala. El límite ya son los errores, no la velocidad.'],
          ['100 o más', 'élite', 'Velocidad de primer nivel. Sostenerla durante 60 segundos es la prueba real.'],
        ]}
      />

      <H2 id="consejos">Seis consejos para subir tu puntuación</H2>
      <Ol>
        <li>
          <Strong>Primero la precisión.</Strong> Cada error baja el WPM neto dos veces: el carácter
          erróneo no cuenta y la corrección cuesta tiempo.
        </li>
        <li>
          <Strong>Compara lo comparable.</Strong> Los resultados de 15 segundos salen más altos que
          los de 60. Mantén una sola configuración para medir tu progreso.
        </li>
        <li>
          <Strong>Puntuación apagada</Strong> cuando midas velocidad pura, encendida cuando entrenes
          para escribir de verdad.
        </li>
        <li>
          <Strong>Ritmo constante antes que ráfagas.</Strong> El temporizador premia el paso parejo
          con pocas correcciones.
        </li>
        <li>
          <Strong>Ojos en la pantalla.</Strong> El cursor y las marcas rojas son tu retroalimentación;
          el teclado no.
        </li>
        <li>
          <Strong>Sesiones cortas.</Strong> Varios tests de 15 segundos con descanso entre ellos
          rinden más que un intento largo y cansado.
        </li>
      </Ol>

      <H2 id="test-o-carrera">¿Test o carrera de mecanografía?</H2>
      <P>
        El test eres tú contra el reloj. Una carrera es el mismo texto para todos, en el mismo
        instante, con barras de progreso en vivo y un ranking al final. Cuando quieras una
        referencia, haz el test; cuando quieras decidir quién es el más rápido,{' '}
        <A href="/es/carrera-de-mecanografia-multijugador">crea una sala y comparte el código</A>.
      </P>
    </ContentPage>
  );
}
