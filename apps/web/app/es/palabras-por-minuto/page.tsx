import type { Metadata } from 'next';
import { ContentPage } from '@/components/seo/ContentPage';
import { A, Callout, Formula, H2, Ol, P, Strong, Table, Ul } from '@/components/seo/Prose';
import type { Faq } from '@/lib/seo/jsonld';
import { pageMetadata } from '@/lib/seo/pages';

export const metadata: Metadata = pageMetadata('wpm', 'es');

const STUDY_URL = 'https://doi.org/10.1145/3173574.3174220';
const STUDY_DATA_URL = 'https://userinterfaces.aalto.fi/136Mkeystrokes/';

const FAQS: Faq[] = [
  {
    q: '¿Qué es un buen WPM?',
    a: 'Cualquier cifra por encima de 52 WPM supera el promedio medido en el mayor estudio público de mecanografía (168.000 personas, CHI 2018, media de 51,56 WPM). 70 WPM es rápido para el uso diario, y 100 WPM o más te sitúa aproximadamente en el pequeño porcentaje superior. Con una precisión por debajo del 95 %, las cifras de velocidad todavía no dicen mucho.',
  },
  {
    q: '¿Cómo convierto WPM a CPM o PPM?',
    a: 'WPM y PPM (palabras por minuto) son lo mismo. Para pasar a caracteres por minuto (CPM) multiplica por cinco: 60 WPM equivalen a 300 caracteres por minuto, porque una palabra se define como cinco caracteres.',
  },
  {
    q: '¿40 WPM es lento?',
    a: '40 WPM está por debajo del promedio de 51,56 WPM del estudio CHI 2018, pero es perfectamente útil para el trabajo diario: son unos 200 caracteres por minuto, o un correo corto en un minuto. La mayoría de quienes aprenden mecanografía al tacto superan los 60 WPM en pocos meses de práctica corta y regular.',
  },
  {
    q: '¿Cuál es la velocidad de escritura más rápida?',
    a: 'En el conjunto de datos del CHI 2018, con 168.000 voluntarios, los más rápidos superaron los 120 WPM. Los mecanógrafos competitivos de los sitios de carreras publican cifras mayores en textos cortos, pero una ráfaga de 15 segundos y un promedio de 60 segundos son mediciones distintas y no deben compararse.',
  },
  {
    q: '¿Importa más la precisión que la velocidad?',
    a: 'Al principio, sí. Cada error resta cinco caracteres de crédito al WPM neto y cuesta una corrección, y el estudio CHI 2018 encontró que los mecanógrafos más rápidos también cometen menos errores. Apunta a una precisión del 97 % o mejor y después empuja la velocidad.',
  },
  {
    q: '¿Cuánto debe durar un test de mecanografía?',
    a: '15 segundos bastan para obtener una cifra rápida y calentar; 60 segundos o 100 palabras se acercan más a tu velocidad sostenida. Elijas lo que elijas, mantenlo constante para medir tu progreso, porque los tests cortos dan cifras más altas que los largos.',
  },
];

export default function PalabrasPorMinutoPage() {
  return (
    <ContentPage
      pageKey="wpm"
      locale="es"
      heading="Qué es WPM: cómo se calcula la velocidad de escritura y qué cuenta como rápido"
      lead="WPM significa palabras por minuto (PPM en español), y una palabra es una unidad fija de cinco caracteres, espacios incluidos, así que la longitud de las palabras reales no importa. El WPM neto cuenta solo los caracteres que escribiste bien, el WPM bruto cuenta todo, y la precisión es la proporción de pulsaciones correctas."
      faqs={FAQS}
    >
      <H2 id="formula">La fórmula del WPM</H2>
      <Formula>{`wpm       = caracteres correctos / 5 / minutos
wpm bruto = todas las pulsaciones / 5 / minutos
precisión = (pulsaciones − errores) / pulsaciones × 100
cpm       = wpm × 5`}</Formula>
      <P>
        <Strong>Ejemplo.</Strong> En un test de 60 segundos pulsas 420 teclas y 12 son erróneas. El
        WPM bruto es 420 ÷ 5 ÷ 1 = 84. Los caracteres correctos son 408, así que el WPM neto es
        408 ÷ 5 ÷ 1 = 81,6, mostrado como 82. La precisión es 408 ÷ 420 = 97,1 %. keyduelo
        redondea el WPM a un entero y la precisión a un decimal.
      </P>
      <P>
        Dos detalles deciden lo estricto que es un test. Primero, si el temporizador arranca al
        cargar la página o con la primera pulsación (keyduelo: primera pulsación). Segundo, qué
        pasa con un error que corriges con Retroceso: en keyduelo la posición corregida cuenta como
        correcta para el WPM, pero el error se queda en la cuenta de precisión, así que un error
        siempre te cuesta algo.
      </P>

      <H2 id="cinco-caracteres">Por qué una palabra son cinco caracteres</H2>
      <P>
        Las palabras reales van de una letra a una docena, así que contarlas directamente haría
        que un texto lleno de palabras cortas pareciera más rápido que uno lleno de palabras
        largas. Los tests de mecanografía heredaron de la era de la máquina de escribir una unidad
        fija, la <Strong>palabra estándar de cinco caracteres</Strong>, espacios y puntuación
        incluidos. Monkeytype, TypeRacer, 10FastFingers y keyduelo la usan, y por eso los
        resultados de los tests basados en palabras están al menos en la misma moneda.
      </P>

      <H2 id="neto-bruto-precision">WPM neto, WPM bruto y precisión</H2>
      <Table
        head={['Métrica', 'Qué cuenta', 'Qué te dice']}
        rows={[
          ['WPM neto (mostrado como "wpm")', 'Caracteres correctos ÷ 5 ÷ minutos', 'Tu producción útil. La cifra que debes seguir y comparar con otros.'],
          ['WPM bruto', 'Todas las pulsaciones ÷ 5 ÷ minutos', 'La velocidad de tus dedos sin contar errores. Una brecha grande entre bruto y neto significa que la precisión es el cuello de botella.'],
          ['Precisión', 'Pulsaciones correctas ÷ todas las pulsaciones', 'Por debajo del 95 %, la velocidad todavía no es el problema. Del 97 % en adelante viven los mecanógrafos rápidos.'],
        ]}
      />

      <H2 id="promedio">Cuál es una velocidad de escritura promedio</H2>
      <P>
        El mayor estudio público sobre escritura con teclado de computador,{' '}
        <A href={STUDY_URL}>Observations on Typing from 136 Million Keystrokes</A> (Dhakal, Feit,
        Kristensson y Oulasvirta, CHI 2018), midió a <Strong>168.000 voluntarios</Strong>{' '}
        transcribiendo frases en línea. La velocidad promedio fue de{' '}
        <Strong>51,56 WPM</Strong> con una desviación estándar de unos 20 WPM, la tasa promedio de
        errores sin corregir fue del 1,17 %, y los más rápidos alcanzaron{' '}
        <Strong>120 WPM o más</Strong>. El estudio también encontró que los mecanógrafos rápidos
        cometen menos errores y usan mucho más el rollover, pulsar la siguiente tecla antes de
        soltar la anterior. El conjunto de datos está{' '}
        <A href={STUDY_DATA_URL}>publicado por la Universidad de Aalto</A>.
      </P>
      <Table
        caption="Franjas de velocidad. Las proporciones son una aproximación normal a partir de la media y la desviación estándar del estudio; la distribución real tiene cola a la derecha, así que las franjas altas son algo mayores."
        head={['WPM', 'Nivel', 'Proporción aproximada de personas']}
        rows={[
          ['menos de 30', 'principiante', 'alrededor del 14 %'],
          ['30 a 50', 'promedio', 'alrededor del 33 %'],
          ['50 a 70', 'sólido', 'alrededor del 35 %'],
          ['70 a 100', 'rápido', 'alrededor del 17 %'],
          ['100 o más', 'élite', 'alrededor del 1 %'],
        ]}
      />
      <Callout title="Dónde encaja keyduelo">
        Un test de keyduelo de 15 segundos sin puntuación es una ráfaga corta sobre palabras
        comunes, así que espera unos WPM más que en la transcripción de frases del estudio. Usa las
        franjas como orientación y mide siempre con la misma configuración.
      </Callout>

      <H2 id="por-que-cambia">Por qué tu WPM cambia entre sitios</H2>
      <Ul>
        <li>
          <Strong>Tipo de texto:</Strong> las palabras comunes al azar (keyduelo, Monkeytype) se
          escriben más rápido que las citas con nombres y puntuación (TypeRacer) o que el código.
        </li>
        <li>
          <Strong>Regla de error:</Strong> algunos tests dejan pasar un carácter erróneo y lo
          penalizan; otros te bloquean hasta corregirlo, lo que baja el WPM y sube la precisión.
        </li>
        <li>
          <Strong>Duración:</Strong> los resultados de 15 segundos salen más altos que los de 60
          porque no te cansas.
        </li>
        <li>
          <Strong>Inicio del temporizador:</Strong> con la primera pulsación o al cargar la página.
        </li>
        <li>
          <Strong>Dispositivo:</Strong> los teclados en pantalla con autocorrección no son
          comparables con los teclados físicos.
        </li>
      </Ul>
      <P>
        keyduelo sigue las convenciones de Monkeytype, así que las cifras entre ambos son cercanas;
        las de las carreras con citas se verán más bajas. Compruébalo en el{' '}
        <A href="/es/test-de-mecanografia">test de mecanografía gratis</A>.
      </P>

      <H2 id="mejorar">Cómo mejorar tu WPM</H2>
      <Ol>
        <li>
          <Strong>Arregla primero la precisión.</Strong> Llega al 97 % antes de perseguir
          velocidad; los errores cuestan doble.
        </li>
        <li>
          <Strong>Escribe al tacto desde la fila central.</Strong> Ojos en la pantalla, los diez
          dedos, sin buscar teclas.
        </li>
        <li>
          <Strong>Deja que las teclas se solapen.</Strong> El rollover fue uno de los marcadores más
          fuertes de los mecanógrafos rápidos en los datos del CHI 2018.
        </li>
        <li>
          <Strong>Entrena los pares comunes.</Strong> Los pares de letras escritos con manos o dedos
          distintos predijeron la velocidad mejor que las letras repetidas en el mismo estudio.
        </li>
        <li>
          <Strong>Sesiones cortas y frecuentes.</Strong> Unos cuantos tests de 15 segundos al día
          rinden más que una sesión larga a la semana.
        </li>
        <li>
          <Strong>Mide siempre igual</Strong> y después{' '}
          <A href="/es/carrera-de-mecanografia-multijugador">compite con amigos</A> para
          motivarte.
        </li>
      </Ol>

      <H2 id="glosario">Vocabulario de velocidad de escritura</H2>
      <Ul>
        <li>
          <Strong>WPM o PPM:</Strong> palabras por minuto, con una palabra definida como cinco
          caracteres.
        </li>
        <li>
          <Strong>CPM:</Strong> caracteres por minuto, igual a WPM × 5.
        </li>
        <li>
          <Strong>WPM neto y bruto:</Strong> solo caracteres correctos frente a todas las
          pulsaciones.
        </li>
        <li>
          <Strong>Precisión:</Strong> proporción de pulsaciones correctas.
        </li>
        <li>
          <Strong>Tasa de errores sin corregir:</Strong> errores que quedan en el texto final, la
          medida usada en el estudio CHI 2018 (promedio del 1,17 %).
        </li>
        <li>
          <Strong>KSPC:</Strong> pulsaciones por carácter; 1,0 significa ninguna corrección.
        </li>
        <li>
          <Strong>IKI:</Strong> intervalo entre teclas, el tiempo entre dos pulsaciones.
        </li>
        <li>
          <Strong>Rollover:</Strong> pulsar la siguiente tecla antes de soltar la anterior.
        </li>
      </Ul>
    </ContentPage>
  );
}
