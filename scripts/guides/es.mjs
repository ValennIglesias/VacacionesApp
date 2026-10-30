// Guías en español. body es HTML; [[fig nombre | pie]] inserta una captura de public/img/guides/es-{nombre}.jpg
export const GUIDES = [
  {
    slug: "como-dividir-gastos-de-un-viaje",
    pair: "how-to-split-travel-expenses",
    published: "2026-10-18",
    title: "Cómo dividir los gastos de un viaje entre amigos sin peleas",
    desc: "Guía práctica para repartir los gastos de un viaje en grupo: qué anotar, cómo dividir, cuándo hacer cuentas y cómo saldar deudas sin discusiones, con un ejemplo completo.",
    lead: "Un viaje en grupo sale más barato y es más divertido, hasta que llega el momento de hacer cuentas. Con un método simple, nadie pone de más y nadie queda debiendo.",
    related: ["minimizar-transferencias", "gastos-en-distintas-monedas", "hablar-de-plata-con-amigos"],
    body: `
<h2>El problema no es la plata, es la falta de registro</h2>
<p>En un viaje casi nunca paga todo una sola persona. Uno reserva el alojamiento con la tarjeta, otro alquila el auto, alguien hace la compra grande del supermercado y otro paga las entradas de la excursión. A los tres días ya hay una docena de pagos cruzados, y al final de la semana nadie recuerda bien quién puso qué.</p>
<p>Las discusiones casi nunca son por mala fe. Aparecen porque cada uno tiene una idea distinta de cuánto puso, y sin un registro compartido no hay forma de comprobarlo. Quien adelantó mucho siente que siempre paga; quien adelantó poco siente que le cobran de más.</p>
<p>La solución tiene tres partes: <strong>anotar todo en el momento</strong>, <strong>dividir cada gasto solo entre quienes participaron</strong> y <strong>saldar al final con la menor cantidad de pagos posible</strong>. El resto de esta guía explica cada paso con un ejemplo real.</p>

<h2>1. Acuerden las reglas antes de salir</h2>
<p>Cinco minutos de charla antes del viaje evitan horas de discusión después. No hace falta un contrato: alcanza con que todos escuchen lo mismo. Estos son los puntos que conviene definir:</p>
<ul>
<li><strong>Qué se divide entre todos</strong>: alojamiento, transporte compartido, combustible, peajes, supermercado.</li>
<li><strong>Qué paga cada uno</strong>: compras personales, souvenirs, gustos individuales.</li>
<li><strong>Cómo se reparten las comidas afuera</strong>: en partes iguales, o cada uno lo suyo si hay mucha diferencia en lo que se pide.</li>
<li><strong>En qué moneda se pagan las deudas</strong> si viajan al exterior, y con qué cotización.</li>
<li><strong>Cuándo se hacen cuentas</strong>: al final, o cada pocos días si el viaje es largo.</li>
</ul>
<p>Si alguien no toma alcohol o no va a hacer una actividad cara, es el momento de decirlo. Es mucho más fácil acordar cuando nadie debe nada todavía.</p>

<h2>2. Anoten cada gasto en el momento</h2>
<p>La regla de oro es registrar el gasto apenas se paga, con cuatro datos: <strong>monto, quién pagó, entre quiénes se divide y categoría</strong>. Si se deja para la noche, los tickets se pierden; si se deja para el último día, la memoria inventa.</p>
<p>No hace falta que una sola persona haga de contador. Lo ideal es que cualquiera del grupo pueda anotar, incluso en nombre de otro que no tiene el teléfono a mano: "Tomás pagó el estacionamiento, lo cargo yo".</p>
[[fig add-expense | Cargar un gasto: monto, categoría, quién pagó y entre quiénes se divide]]
<p>En TribuSplit el gasto se carga en la moneda del destino por defecto. Si alguien pagó en otra moneda (por ejemplo, una excursión cobrada en dólares en Brasil), se elige "Otra" y la app la convierte con la cotización del día, que se puede ajustar.</p>

<h2>3. Dividan solo entre quienes participaron</h2>
<p>Dividir todo en partes iguales parece justo, pero no siempre lo es. Si alguien no fue a la excursión, no tiene sentido que pague esa parte. Cada gasto debería dividirse solo entre las personas que lo aprovecharon.</p>
<p>Un ejemplo con cuatro amigos en una semana en la costa:</p>
<table>
<thead><tr><th>Gasto</th><th>Pagó</th><th>Se divide entre</th><th>A cada uno</th></tr></thead>
<tbody>
<tr><td>Alojamiento 1.200</td><td>Ana</td><td>Los 4</td><td>300</td></tr>
<tr><td>Auto y nafta 480</td><td>Bruno</td><td>Los 4</td><td>120</td></tr>
<tr><td>Excursión en barco 270</td><td>Carla</td><td>Ana, Bruno y Carla</td><td>90</td></tr>
<tr><td>Supermercado 200</td><td>Diego</td><td>Los 4</td><td>50</td></tr>
<tr><td>Cena de cumpleaños 360</td><td>Ana</td><td>Bruno, Carla y Diego (invitan a Ana)</td><td>120</td></tr>
</tbody>
</table>
<p>Fijate el último gasto: Ana pagó la cena, pero como era su cumpleaños la invitan los otros tres. Se divide entre ellos y Ana no paga su parte. Este tipo de situaciones, imposibles de reconstruir de memoria, son triviales si se anotan en el momento.</p>

<h2>4. Calculen el saldo de cada uno</h2>
<p>Con el registro completo, el saldo de cada persona es una resta: <strong>lo que pagó menos lo que le tocaba</strong>.</p>
<table>
<thead><tr><th>Persona</th><th>Pagó</th><th>Le tocaba</th><th>Saldo</th></tr></thead>
<tbody>
<tr><td>Ana</td><td>1.560</td><td>300 + 120 + 90 + 50 = 560</td><td>+1.000</td></tr>
<tr><td>Bruno</td><td>480</td><td>300 + 120 + 90 + 50 + 120 = 680</td><td>−200</td></tr>
<tr><td>Carla</td><td>270</td><td>680</td><td>−410</td></tr>
<tr><td>Diego</td><td>200</td><td>300 + 120 + 50 + 120 = 590</td><td>−390</td></tr>
</tbody>
</table>
<p>La suma de los saldos da cero: lo que unos deben es exactamente lo que otros tienen que cobrar. Si no da cero, falta un gasto o hay uno mal dividido.</p>
[[fig balances | Saldos pendientes: en verde a quién le deben, en rojo quién debe]]

<h2>5. En viajes largos, hagan cuentas por etapas</h2>
<p>En viajes de más de una semana conviene hacer una repartida parcial cada tanto. Así nadie acumula una deuda grande y quien adelantó mucho dinero (típicamente el que reservó el alojamiento) lo recupera antes.</p>
<p>Lo importante es que los gastos ya saldados <strong>no vuelvan a contarse en la repartida final</strong>, aunque sí aparezcan en el resumen total del viaje. En TribuSplit eso es el botón "Repartir hasta hoy": toma todo lo pendiente, calcula los pagos y deja esos gastos marcados como repartidos.</p>

<h2>6. Salden con la menor cantidad de transferencias</h2>
<p>Si cada persona le devolviera a cada una lo que le prestó, en el ejemplo habría al menos seis transferencias. Pero no hace falta: alcanza con que los que deben les paguen directamente a los que tienen que cobrar.</p>
<ul>
<li>Carla le paga 410 a Ana.</li>
<li>Diego le paga 390 a Ana.</li>
<li>Bruno le paga 200 a Ana.</li>
</ul>
<p>Tres transferencias y todos quedan en cero. En un grupo de N personas alcanza siempre con N − 1 pagos como máximo. El método está explicado paso a paso en <a href="/guias/minimizar-transferencias/">cómo saldar deudas con la menor cantidad de transferencias</a>.</p>

<h2>7. Confirmen cada pago</h2>
<p>Un detalle chico que evita muchos malentendidos: cuando alguien transfiere, quien recibe confirma que le llegó. Así queda claro qué deudas están saldadas y cuáles siguen pendientes, sin revisar extractos ni capturas de pantalla en el grupo de mensajes.</p>
[[fig transfers | Cada transferencia muestra quién paga, cuánto, y su estado: pendiente, pagada o confirmada]]
<p>En la app, solo quien debe puede marcar "Ya pagué" y solo quien cobra puede confirmar "Recibido". Cada uno carga su propio alias para que nadie transfiera a una cuenta equivocada.</p>

<h2>Errores comunes</h2>
<ul>
<li><strong>Anotar todo al final.</strong> Siempre se olvida algo, y casi siempre es un gasto chico de quien menos se queja.</li>
<li><strong>Dividir todo entre todos.</strong> Quien no participó de una actividad termina pagándola y se siente usado.</li>
<li><strong>Redondear "a ojo".</strong> Con muchos gastos, los redondeos se acumulan. Mejor que el cálculo cierre al centavo.</li>
<li><strong>Mezclar monedas sin convertir.</strong> Sumar reales con dólares da un número sin sentido. Ver <a href="/guias/gastos-en-distintas-monedas/">cómo manejar gastos en distintas monedas</a>.</li>
<li><strong>Dejar pasar semanas antes de saldar.</strong> Las deudas viejas son las que terminan mal.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Todos tienen que tener la app?</h3>
<p>No. Quien crea el viaje carga los nombres de todos, y cualquiera puede anotar gastos en nombre de otro. Los que quieran marcar sus propios pagos o cargar su alias se suman con el código del viaje, sin necesidad de crear una cuenta.</p>
<h3>¿Qué pasa con los gastos que se pagaron antes de viajar?</h3>
<p>Los pasajes o la seña del alojamiento suelen pagarse semanas antes. Se anotan con su fecha real y aparecen agrupados como "Antes del viaje"; cuentan igual en la repartida.</p>
<h3>¿Y si alguien se va antes?</h3>
<p>Hagan una repartida parcial el día que se va: queda saldado con todos y los gastos siguientes se dividen solo entre los que siguen.</p>

<p><strong>En resumen:</strong> reglas claras antes de salir, cada gasto anotado en el momento, división solo entre quienes participaron, pocas transferencias al final y cada pago confirmado. Con eso, la plata deja de ser un tema del viaje.</p>
`,
  },

  {
    slug: "gastos-en-distintas-monedas",
    pair: "travel-expenses-multiple-currencies",
    published: "2026-10-18",
    title: "Cómo manejar gastos en distintas monedas durante un viaje",
    desc: "Qué moneda usar para anotar los gastos, cómo convertir pagos en otra divisa y cómo saldar las deudas del grupo en la moneda de casa, con ejemplos y errores comunes.",
    lead: "Viajar al exterior suma una capa de complejidad: se paga en moneda local, a veces en dólares o euros, y las deudas se saldan en la moneda de casa. Ordenarlo es más simple de lo que parece.",
    related: ["dolar-tarjeta-mep-blue-viajar", "pagar-en-brasil-pix-tarjeta-efectivo", "como-dividir-gastos-de-un-viaje"],
    body: `
<h2>Tres monedas distintas en un mismo viaje</h2>
<p>Pensemos en un caso típico: cuatro amigos de Buenos Aires se van una semana a Florianópolis. El alojamiento lo reservaron desde Argentina y se cobró en reales. En Brasil pagan casi todo en reales, pero un paseo en barco se lo cobraron en dólares. Y cuando vuelvan, se van a transferir pesos argentinos entre ellos.</p>
<p>Ahí conviven tres monedas con funciones distintas:</p>
<ul>
<li><strong>La moneda del viaje</strong> (reales): en la que se hacen casi todos los gastos y en la que conviene llevar las cuentas.</li>
<li><strong>Monedas ocasionales</strong> (dólares): pagos sueltos en otra divisa.</li>
<li><strong>La moneda de repartida</strong> (pesos): en la que el grupo se paga las deudas entre sí.</li>
</ul>
<p>Mezclarlas es el origen de casi todos los errores. La clave es tratarlas por separado, con tres reglas.</p>

<h2>Regla 1: anoten en la moneda en que pagaron</h2>
<p>Si pagaron una cena en reales, se anota en reales. Si el barco se pagó en dólares, se anota en dólares. Convertir mentalmente en el momento introduce errores y además mezcla cotizaciones de días distintos.</p>
<p>Lo práctico es que la herramienta tome la moneda del destino por defecto, así el 90 % de los gastos se cargan sin pensar, y que permita elegir otra moneda cuando haga falta.</p>
[[fig expenses | Los gastos del viaje, todos en la moneda del destino, agrupados por día]]

<h2>Regla 2: cada gasto en otra moneda se convierte con la cotización de ese día</h2>
<p>Cuando un gasto se hace en una moneda distinta de la del viaje, conviene convertirlo a la moneda del viaje <strong>con la cotización del día en que se hizo</strong>, y dejar esa cotización fija. Así el valor del gasto no cambia aunque el dólar se mueva la semana siguiente.</p>
<p>Ejemplo: el paseo costó 120 dólares y ese día 1 dólar equivalía a 5,40 reales. El gasto queda registrado como 648 reales. Si al final del viaje el dólar está a 5,60, ese gasto sigue valiendo 648 reales: es lo que efectivamente costó.</p>
<p>En TribuSplit, al cargar un gasto se toca "Otra", se elige la moneda y la app trae la cotización del día. Si quien pagó sabe que su tarjeta le cobró otra cosa, la puede corregir a mano.</p>

<h2>Regla 3: definan en qué moneda se pagan las deudas entre ustedes</h2>
<p>Una cosa es la moneda en que se gasta y otra la moneda en que el grupo salda. Los amigos argentinos gastan en reales pero se transfieren pesos; un grupo de españoles en México gasta en pesos mexicanos y salda en euros; una pareja de chilenos en Europa gasta en euros y salda en pesos chilenos.</p>
<p>El procedimiento que evita errores es siempre el mismo:</p>
<ol>
<li>Calcular todos los saldos en la moneda del viaje (reales, en el ejemplo).</li>
<li>Calcular las transferencias mínimas en esa misma moneda.</li>
<li>Recién ahí, convertir cada transferencia a la moneda de repartida con <strong>una única cotización acordada</strong>.</li>
</ol>
<p>Convertir al final, y solo las transferencias, tiene una ventaja: todos los cálculos intermedios son exactos, y la cotización se aplica una sola vez.</p>
[[fig settle-fx | Al repartir se elige la moneda de pago y la cotización; las transferencias se muestran en las dos monedas]]

<h2>¿Qué cotización usar para saldar?</h2>
<p>No hay una cotización "correcta" para todos los casos. Hay varias referencias razonables:</p>
<table>
<thead><tr><th>Referencia</th><th>Qué es</th><th>Cuándo conviene</th></tr></thead>
<tbody>
<tr><td>Mercado internacional</td><td>La que publican los servicios de cambio y los bancos centrales</td><td>Como referencia neutral, si nadie tiene una razón para otra</td></tr>
<tr><td>Tarjeta</td><td>Lo que efectivamente cobró el banco, con comisiones e impuestos</td><td>Si quien adelantó los gastos pagó casi todo con tarjeta</td></tr>
<tr><td>Casa de cambio</td><td>La que se obtuvo al cambiar efectivo</td><td>Si el viaje se pagó mayormente en efectivo</td></tr>
</tbody>
</table>
<p>La pregunta que ordena la decisión es: <strong>¿cuánto le costó realmente, en su moneda, a quien adelantó la plata?</strong> Si se usa una cotización más baja que su costo real, quien cobra pierde; si se usa una más alta, gana a costa de los demás.</p>
<p>En países con varios tipos de cambio, como Argentina, la diferencia entre una referencia y otra puede ser grande. Lo explicamos en detalle en <a href="/guias/dolar-tarjeta-mep-blue-viajar/">qué dólar usar para repartir gastos de viaje</a>.</p>

<h2>Un ejemplo completo</h2>
<p>Siguiendo el viaje a Florianópolis: después de la semana, las transferencias en reales quedaron así.</p>
<table>
<thead><tr><th>Transferencia</th><th>En reales</th><th>En pesos (1 BRL = 300 ARS)</th></tr></thead>
<tbody>
<tr><td>Tomás → Ana</td><td>1.096,28</td><td>328.884</td></tr>
<tr><td>Valen → Lucía</td><td>406,10</td><td>121.830</td></tr>
<tr><td>Valen → Ana</td><td>296,92</td><td>89.076</td></tr>
</tbody>
</table>
<p>La cotización (en este ejemplo, 300 pesos por real; un valor ilustrativo) se acordó antes de repartir y queda guardada junto con la repartida. Si el real sube la semana siguiente, los montos no cambian: lo que se acordó es lo que se paga.</p>
[[fig transfers | La repartida guarda la cotización usada y cada monto en las dos monedas]]

<h2>Errores comunes</h2>
<ul>
<li><strong>Sumar monedas distintas sin convertir.</strong> 100 reales más 50 dólares no son 150 de nada.</li>
<li><strong>Convertir todo con la cotización del último día</strong>, aunque los gastos se hicieron en semanas distintas.</li>
<li><strong>Elegir la cotización al final</strong>, cuando cada uno ya sabe si le conviene una u otra. Acuérdenla antes.</li>
<li><strong>Olvidar las comisiones</strong> de la tarjeta o del cajero: si son significativas, pueden justificar usar la cotización de tarjeta. Más detalle en la guía de <a href="/en/guides/paying-abroad-cards-cash-fees/">pagos en el exterior</a> (en inglés).</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Y si cada integrante vive en un país distinto?</h3>
<p>Elijan una moneda de repartida común (muchas veces dólares o euros) y que cada uno convierta desde ahí con su propio medio de pago. También pueden hacer repartidas separadas en monedas distintas, pero suele complicar más de lo que ayuda.</p>
<h3>¿Puedo cambiar la moneda de repartida a mitad del viaje?</h3>
<p>Sí. Cada repartida (parcial o final) tiene su propia moneda y cotización. Una parcial puede saldarse en reales en Brasil y la final en pesos al volver.</p>

<p><strong>En resumen:</strong> anoten en la moneda en que pagaron, fijen la cotización de cada gasto en otra moneda, calculen todo en la moneda del viaje y conviertan solo las transferencias finales, con una cotización acordada de antemano.</p>
`,
  },

  {
    slug: "minimizar-transferencias",
    pair: "settle-group-debts-fewer-transfers",
    published: "2026-10-18",
    title: "Cómo saldar deudas de grupo con la menor cantidad de transferencias",
    desc: "El método para simplificar las deudas de un grupo explicado paso a paso: saldo neto de cada persona, cómo emparejar deudores y acreedores, redondeos y repartidas parciales.",
    lead: "Cuando seis personas comparten gastos durante una semana, las deudas cruzadas parecen un laberinto. Con un método simple, se resuelven en pocos pagos.",
    related: ["como-dividir-gastos-de-un-viaje", "gastos-en-distintas-monedas", "gastos-compartidos-entre-roommates"],
    body: `
<h2>El problema de las deudas cruzadas</h2>
<p>Imaginá un grupo de seis amigos que comparte una casa durante una semana. Cada día alguien paga algo distinto: el súper, la nafta, una cena, las entradas a un parque. Si cada vez que alguien paga los demás le devuelven su parte, cada gasto genera cinco transferencias. Con treinta gastos en la semana, son ciento cincuenta pagos chicos.</p>
<p>Peor todavía: muchos de esos pagos van en direcciones opuestas. Ana le transfiere a Bruno su parte de la nafta y al día siguiente Bruno le transfiere a Ana su parte del súper. Es plata que va y vuelve sin sentido.</p>
<p>La buena noticia es que no hace falta hacer ninguno de esos pagos intermedios. Lo único que importa es <strong>cuánto puso cada persona en total y cuánto le tocaba en total</strong>.</p>

<h2>Paso 1: el saldo neto de cada persona</h2>
<p>Para cada integrante del grupo se calcula:</p>
<p><strong>Saldo = lo que pagó − lo que le tocaba</strong></p>
<ul>
<li>Si el saldo es <strong>positivo</strong>, el grupo le debe dinero.</li>
<li>Si es <strong>negativo</strong>, le debe dinero al grupo.</li>
<li>Si es cero, está en paz.</li>
</ul>
<p>Una propiedad importante: <strong>la suma de todos los saldos siempre da cero</strong>. Lo que unos deben es exactamente lo que otros tienen que cobrar. Si en tus cuentas no da cero, hay un error.</p>
[[fig balances | Saldos de cada integrante: lo que pagó menos lo que le tocaba]]

<h2>Paso 2: emparejar deudores y acreedores</h2>
<p>Con los saldos calculados, el método es este:</p>
<ol>
<li>Tomá a la persona que más debe y a la que más tiene que cobrar.</li>
<li>La primera le paga a la segunda el menor de los dos montos.</li>
<li>Una de las dos queda en cero. La otra queda con lo que le falta.</li>
<li>Repetí con las que quedan, hasta que todos estén en cero.</li>
</ol>
<p>Cada vuelta deja al menos a una persona saldada, así que el proceso termina rápido.</p>

<h2>Un ejemplo con cuatro personas</h2>
<table>
<thead><tr><th>Persona</th><th>Pagó</th><th>Le tocaba</th><th>Saldo</th></tr></thead>
<tbody>
<tr><td>Ana</td><td>500</td><td>250</td><td>+250</td></tr>
<tr><td>Bruno</td><td>200</td><td>250</td><td>−50</td></tr>
<tr><td>Carla</td><td>300</td><td>250</td><td>+50</td></tr>
<tr><td>Diego</td><td>0</td><td>250</td><td>−250</td></tr>
</tbody>
</table>
<ol>
<li>Diego (debe 250) le paga 250 a Ana (cobra 250). Ambos quedan en cero.</li>
<li>Bruno (debe 50) le paga 50 a Carla (cobra 50). Listo.</li>
</ol>
<p>Dos transferencias en lugar de las seis o más que habría si cada uno devolviera cada gasto por separado.</p>

<h2>Un ejemplo más realista, con seis personas</h2>
<table>
<thead><tr><th>Persona</th><th>Saldo</th></tr></thead>
<tbody>
<tr><td>Ana</td><td>+620</td></tr>
<tr><td>Bruno</td><td>+180</td></tr>
<tr><td>Carla</td><td>−90</td></tr>
<tr><td>Diego</td><td>−300</td></tr>
<tr><td>Eva</td><td>−260</td></tr>
<tr><td>Fede</td><td>−150</td></tr>
</tbody>
</table>
<p>Aplicando el método:</p>
<ol>
<li>Diego (−300) le paga 300 a Ana (+620). Ana queda en +320.</li>
<li>Ana sigue siendo quien más cobra; Eva (−260) le paga 260. Ana queda en +60.</li>
<li>Bruno (+180) ahora es quien más cobra; Fede (−150) le paga 150. Bruno queda en +30.</li>
<li>Carla (−90) le paga 60 a Ana y 30 a Bruno.</li>
</ol>
<p>Cinco transferencias en total, y todos quedan en cero. Con cualquier otro esquema "uno por uno" serían bastantes más.</p>

<h2>¿Cuántas transferencias hacen falta como máximo?</h2>
<p>Con este método, en un grupo de N personas alcanza con <strong>N − 1 transferencias como máximo</strong>, y muchas veces menos. Para cuatro personas, tres pagos como mucho; para seis, cinco; para diez, nueve. La cantidad de gastos no importa: pueden ser diez o doscientos.</p>
[[fig settle | Antes de confirmar, la app muestra cómo quedan los pagos]]

<h2>Detalles que conviene cuidar</h2>
<h3>Redondeos</h3>
<p>Al dividir 100 entre tres personas, cada una paga 33,33 y sobra un centavo. Parece nada, pero con decenas de gastos los centavos se acumulan y la suma deja de cerrar. Lo correcto es asignar los centavos sobrantes de forma consistente (por ejemplo, siempre a los primeros de la lista) para que cada gasto cierre exacto.</p>
<h3>Repartidas parciales</h3>
<p>Si el grupo hace cuentas a mitad del viaje, esos gastos ya saldados no deben volver a contarse al final. Cada repartida toma solo lo pendiente hasta ese momento, y el resumen total del viaje sigue mostrando todo.</p>
<h3>Confirmación de cada pago</h3>
<p>Cada transferencia debería confirmarla quien recibe. Sin confirmación, a los pocos días nadie sabe qué pagos se hicieron y cuáles no.</p>
<h3>Moneda de pago</h3>
<p>Si el viaje fue en otra moneda, conviene calcular todo en esa moneda y convertir solo las transferencias finales. Lo explicamos en <a href="/guias/gastos-en-distintas-monedas/">cómo manejar gastos en distintas monedas</a>.</p>

<h2>¿Este método da siempre el mínimo absoluto?</h2>
<p>Casi siempre da el mínimo o queda muy cerca. Hay casos raros donde un subgrupo se compensa exacto entre sí y se podría ahorrar un pago más, pero encontrarlos requiere probar muchas combinaciones. En la práctica, la diferencia es de una transferencia en grupos grandes, y el método simple tiene una ventaja: cualquiera puede verificarlo a mano.</p>

<div class="tip"><strong>En la práctica:</strong> no hace falta hacer este cálculo a mano. TribuSplit calcula los saldos y propone las transferencias en la moneda que elijan; solo queda copiar el alias, pagar y confirmar.</div>
`,
  },

  {
    slug: "dividir-gastos-en-pareja",
    pair: "split-expenses-as-a-couple",
    published: "2026-10-18",
    title: "Cómo dividir gastos en pareja: métodos y ejemplos",
    desc: "Las formas más comunes de dividir gastos en pareja: 50/50, proporcional a los ingresos, fondo común o por categorías. Ventajas, desventajas y ejemplos con números.",
    lead: "No hay una forma correcta de dividir gastos en pareja, solo la que les funciona a los dos. Lo importante es elegirla a conciencia y que ambos la sientan justa.",
    related: ["gastos-compartidos-entre-roommates", "hablar-de-plata-con-amigos", "presupuesto-de-viaje-en-grupo"],
    body: `
<h2>Por qué vale la pena hablarlo</h2>
<p>En muchas parejas la división de gastos se arma sola: uno paga el alquiler porque el contrato está a su nombre, el otro hace las compras porque pasa por el súper. Funciona un tiempo, hasta que los montos cambian (sube el alquiler, llega un hijo, uno cambia de trabajo) y la sensación de "siempre pago yo" aparece sin que nadie haya hecho nada mal.</p>
<p>Elegir un método explícito no es desconfianza. Es tener un criterio común para cuando las cosas cambien. Estos son los cuatro más usados, con sus ventajas y sus trampas.</p>

<h2>Método 1: mitad y mitad (50/50)</h2>
<p>Cada gasto compartido se divide en partes iguales. Es simple, transparente y no requiere hablar de sueldos.</p>
<p><strong>Funciona bien cuando:</strong> los ingresos son parecidos y los gustos de consumo también.</p>
<p><strong>La trampa:</strong> si uno gana mucho más, el otro termina destinando una proporción mucho mayor de su ingreso a los gastos comunes. Con un alquiler de 1.000 y sueldos de 3.000 y 1.500, uno usa el 17 % de su ingreso y el otro el 33 %.</p>

<h2>Método 2: proporcional a los ingresos</h2>
<p>Cada uno aporta según lo que gana.</p>
<table>
<thead><tr><th></th><th>Ingreso</th><th>Proporción</th><th>Paga de un alquiler de 1.000</th></tr></thead>
<tbody>
<tr><td>Persona A</td><td>3.000</td><td>60 %</td><td>600</td></tr>
<tr><td>Persona B</td><td>2.000</td><td>40 %</td><td>400</td></tr>
</tbody>
</table>
<p><strong>Funciona bien cuando:</strong> hay diferencias de ingreso importantes y ambos quieren que el esfuerzo sea parecido.</p>
<p><strong>La trampa:</strong> requiere hablar abiertamente de sueldos y actualizar la proporción cuando cambian. Si los ingresos son variables (freelance, comisiones), conviene revisarla cada pocos meses.</p>

<h2>Método 3: fondo común</h2>
<p>Ambos ponen un monto fijo por mes (igual o proporcional) en una cuenta compartida, y de ahí salen los gastos comunes. No hace falta dividir cada gasto: el fondo paga y listo.</p>
<p><strong>Funciona bien cuando:</strong> la pareja convive hace tiempo y los gastos comunes son estables.</p>
<p><strong>La trampa:</strong> si el fondo se queda corto, alguien pone de su bolsillo "por esta vez" y la cuenta deja de reflejar la realidad. Conviene revisar los aportes cada tanto.</p>

<h2>Método 4: por categorías</h2>
<p>Uno se encarga del alquiler, el otro del súper y los servicios. Práctico porque cada uno paga "lo suyo" sin transferencias.</p>
<p><strong>La trampa:</strong> los montos de cada categoría cambian con el tiempo y la división puede desequilibrarse sin que nadie lo note. El súper sube con la inflación, el alquiler se ajusta una vez por año. Revisarlo cada tanto evita sorpresas.</p>

<h2>Comparación rápida</h2>
<table>
<thead><tr><th>Método</th><th>Simplicidad</th><th>Equidad con ingresos distintos</th><th>Mantenimiento</th></tr></thead>
<tbody>
<tr><td>50/50</td><td>Alta</td><td>Baja</td><td>Bajo</td></tr>
<tr><td>Proporcional</td><td>Media</td><td>Alta</td><td>Medio</td></tr>
<tr><td>Fondo común</td><td>Alta en el día a día</td><td>Depende de los aportes</td><td>Medio</td></tr>
<tr><td>Por categorías</td><td>Alta</td><td>Variable</td><td>Alto (se desequilibra)</td></tr>
</tbody>
</table>

<h2>Viajes en pareja: un caso aparte</h2>
<p>Muchas parejas que dividen los gastos de la casa de una forma usan otra para los viajes. Es común que la casa sea proporcional y los viajes 50/50, o al revés. Lo importante es decidirlo antes de reservar.</p>
<p>En un viaje los gastos son muchos y chicos, y los dos pagan cosas distintas todo el tiempo. Anotarlos a medida que ocurren y hacer una sola cuenta al final es mucho más cómodo que ir pagándose cada cena. Si además quieren saber en qué se les fue la plata, el resumen por categoría lo muestra solo.</p>
[[fig summary | El resumen del viaje: cuánto se fue en transporte, alojamiento, comida y cada día]]

<h2>Cosas que conviene decidir explícitamente</h2>
<ul>
<li>¿Los viajes y salidas se dividen igual que los gastos de la casa?</li>
<li>¿Qué pasa con los regalos, las familias de cada uno o las mascotas?</li>
<li>¿Cómo se manejan las compras individuales que benefician a los dos (una cafetera, un sillón)?</li>
<li>¿Qué pasa si uno se queda sin ingresos por un tiempo?</li>
<li>¿Cada cuánto revisan el acuerdo?</li>
</ul>

<h2>El registro ayuda más de lo que parece</h2>
<p>Aun con total confianza, anotar los gastos compartidos evita la sensación de "siempre pago yo". No se trata de controlar al otro sino de tener datos en lugar de impresiones. Con un registro, la conversación pasa de "siento que pongo más" a "este mes puse 120 más, ¿lo compensamos o lo dejamos para el próximo?".</p>
<p>Un método simple: anotar quién pagó cada gasto compartido y hacer cuentas una vez por mes, o al final de cada viaje. La app calcula el saldo y queda una sola transferencia.</p>

<h2>Señales de que el método actual no funciona</h2>
<ul>
<li>Uno de los dos evita hablar de plata o se pone a la defensiva.</li>
<li>Aparecen frases como "yo pago siempre" o "vos nunca ponés".</li>
<li>Alguien deja de proponer planes porque no sabe si le van a cobrar la mitad.</li>
<li>Los gastos chicos se discuten más que los grandes.</li>
</ul>
<p>Si aparece alguna, no es un fracaso: es momento de revisar el acuerdo. La guía <a href="/guias/hablar-de-plata-con-amigos/">cómo hablar de plata</a> tiene ideas para encarar la conversación, aunque esté pensada para amigos.</p>

<div class="tip"><strong>Clave:</strong> el mejor método es el que ambos sienten justo. Empiecen con uno, revísenlo cada tanto y cámbienlo si deja de funcionar. Lo único que no conviene es no tener ninguno.</div>
`,
  },

  {
    slug: "dolar-tarjeta-mep-blue-viajar",
    pair: null,
    published: "2026-10-18",
    title: "Dólar oficial, MEP, blue o tarjeta: cuál usar para repartir gastos de viaje",
    desc: "Qué es cada tipo de dólar en Argentina y cuál conviene usar para pasar a pesos las deudas de un viaje en grupo, según cómo pagó cada uno. Con ejemplos y criterios para acordarlo.",
    lead: "En Argentina conviven varias cotizaciones del dólar. Cuando un grupo vuelve de viaje y tiene que pasar las deudas a pesos, elegir una u otra puede cambiar bastante los montos.",
    related: ["gastos-en-distintas-monedas", "pagar-en-brasil-pix-tarjeta-efectivo", "como-dividir-gastos-de-un-viaje"],
    body: `
<h2>Por qué importa</h2>
<p>Supongamos que un grupo gastó en reales en Brasil y al volver se transfiere pesos. Para pasar cada deuda a pesos hay que elegir una cotización. Si se usa una que está bastante por encima de otra, quien debe paga más pesos y quien cobra recibe más. Con deudas de cientos de dólares, la diferencia entre una cotización y otra puede ser de decenas de miles de pesos.</p>
<p>No es un detalle menor y no hay una respuesta única: depende de cómo consiguió los dólares (o los reales) cada uno. Esta guía explica qué es cada tipo de dólar y da un criterio para elegir.</p>

<h2>Los tipos de dólar más usados</h2>
<p>Las cotizaciones cambian todos los días y las reglas sobre impuestos y percepciones cambian con el tiempo, así que acá describimos qué es cada una, no sus valores.</p>
<table>
<thead><tr><th>Tipo</th><th>Qué es</th><th>Cuándo tiene sentido usarlo</th></tr></thead>
<tbody>
<tr><td>Oficial</td><td>La cotización que publican los bancos para la compra y venta minorista.</td><td>Como referencia neutral, si nadie pagó con tarjeta ni cambió efectivo.</td></tr>
<tr><td>MEP (bolsa)</td><td>El dólar que surge de comprar y vender bonos en el mercado de valores.</td><td>Si el grupo suele dolarizarse o pagar la tarjeta con dólares comprados por esta vía.</td></tr>
<tr><td>Blue</td><td>La cotización del mercado informal.</td><td>Como referencia de lo que costó el efectivo, si se consiguió por esa vía.</td></tr>
<tr><td>Tarjeta</td><td>El oficial más los impuestos y percepciones que se aplican a consumos con tarjeta en el exterior.</td><td>Si la mayoría de los gastos se pagaron con tarjeta argentina en pesos.</td></tr>
</tbody>
</table>
<p>A esto se suma la cotización internacional de la moneda del destino (por ejemplo, cuántos dólares vale un real), que es la misma para todo el mundo y sirve para pasar de reales a dólares antes de pasar a pesos.</p>

<h2>La pregunta clave: ¿cuántos pesos le costó a quien pagó?</h2>
<p>La cotización justa es la que refleja el costo real de quien adelantó la plata. Si se usa una más baja, quien cobra pierde pesos; si se usa una más alta, gana a costa de los demás.</p>
<ul>
<li>Si quien adelantó los gastos los pagó <strong>con tarjeta en pesos</strong>, la cotización que refleja su costo real es la de <strong>tarjeta</strong>.</li>
<li>Si pagó <strong>con dólares que ya tenía</strong>, o con la moneda local comprada con dólares MEP, la referencia es el <strong>MEP</strong>.</li>
<li>Si viajó con <strong>efectivo comprado en el mercado informal</strong>, el <strong>blue</strong> refleja mejor su costo.</li>
<li>Si pagó con una <strong>tarjeta debitando dólares</strong> de su cuenta, la referencia vuelve a ser cuánto le costaron esos dólares (normalmente MEP u oficial).</li>
</ul>

<h2>Un ejemplo con números</h2>
<p>Cuatro amigos vuelven de Florianópolis. Después de calcular las transferencias en reales, Tomás le tiene que pagar 1.096,28 reales a Lucía. Lucía pagó casi todo con su tarjeta argentina. Con valores ilustrativos (no son cotizaciones reales):</p>
<table>
<thead><tr><th>Cotización usada</th><th>Pesos por real (ejemplo)</th><th>Tomás le transfiere</th></tr></thead>
<tbody>
<tr><td>Internacional + oficial</td><td>285</td><td>312.440</td></tr>
<tr><td>Internacional + MEP</td><td>288</td><td>315.729</td></tr>
<tr><td>Tarjeta</td><td>370</td><td>405.624</td></tr>
</tbody>
</table>
<p>Como Lucía pagó con tarjeta, lo justo es la tercera fila: es lo que a ella le va a costar el resumen. Si usaran la primera, Lucía pondría de su bolsillo casi 100.000 pesos que no le corresponden.</p>
[[fig settle-fx | Al repartir en pesos, la app muestra las cotizaciones del día para elegir una con un toque]]

<h2>Cuando cada uno pagó de forma distinta</h2>
<p>Es lo más común: uno pagó con tarjeta, otro con efectivo y otro con dólares ahorrados. Ajustar gasto por gasto es posible pero agotador. Dos alternativas razonables:</p>
<ol>
<li><strong>Una cotización intermedia para todo el grupo.</strong> Por ejemplo, el promedio entre MEP y tarjeta. Nadie queda exacto, pero nadie pierde mucho.</li>
<li><strong>La cotización de quien más cobra.</strong> Como es quien más plata adelantó, es quien más arriesga con una cotización baja.</li>
</ol>
<p>Lo importante no es cuál elijan sino que la elijan juntos, y antes.</p>

<h2>Acuérdenlo antes de viajar</h2>
<p>Lo que genera discusiones no es la cotización elegida, sino elegirla al final, cuando cada uno ya sabe si le conviene una u otra. Definirlo antes de salir (o al menos antes de hacer la primera repartida) evita el problema. Un mensaje en el grupo alcanza: "Las deudas las pasamos a pesos con el dólar tarjeta del día que hagamos cuentas".</p>

<h2>Cómo lo resuelve la app</h2>
<p>Al repartir en pesos argentinos, TribuSplit muestra las cotizaciones del dólar oficial, MEP, blue y tarjeta del momento, además de la cotización internacional. Se elige una con un toque, se puede ajustar a mano, y queda fija en esa repartida aunque el dólar cambie después.</p>
[[fig transfers | Cada transferencia en pesos, con su equivalente en reales y la cotización usada]]

<h2>Preguntas frecuentes</h2>
<h3>¿Por qué el dólar tarjeta es más caro?</h3>
<p>Porque a los consumos con tarjeta en el exterior se les suman impuestos y percepciones sobre el oficial. Los porcentajes cambian según la normativa vigente; conviene consultarlos al momento de viajar.</p>
<h3>¿Puedo recuperar las percepciones?</h3>
<p>En algunos casos se pueden computar o pedir su devolución ante el organismo fiscal, según la situación de cada persona. Si alguien del grupo lo va a hacer, es un argumento para usar una cotización algo menor que la de tarjeta. No es asesoramiento impositivo: consulten con un profesional.</p>
<h3>¿Y si alguien no está de acuerdo con la cotización?</h3>
<p>Vuelvan a la pregunta clave: cuánto le costó a quien pagó. Si hay diferencias, una cotización intermedia suele cerrar la discusión.</p>

<p class="meta">Importante: esta guía es informativa y no constituye asesoramiento financiero ni impositivo. Las cotizaciones y la normativa cambian; verifiquen los valores vigentes al momento de saldar.</p>
`,
  },

  {
    slug: "gastos-compartidos-entre-roommates",
    pair: "splitting-bills-with-roommates",
    published: "2026-10-18",
    title: "Gastos compartidos en un departamento: cómo organizarse entre roommates",
    desc: "Cómo dividir alquiler, expensas, servicios, supermercado y gastos comunes cuando se comparte vivienda, con reglas claras, un ejemplo de mes completo y qué hacer cuando alguien se muda.",
    lead: "Compartir departamento reduce costos, pero suma decisiones: quién paga qué, cómo se divide el alquiler si las habitaciones no son iguales y qué hacer con las compras comunes.",
    related: ["dividir-gastos-en-pareja", "minimizar-transferencias", "hablar-de-plata-con-amigos"],
    body: `
<h2>Separen tres tipos de gastos</h2>
<p>El primer paso es ponerse de acuerdo en qué es compartido y qué no. Casi todos los gastos de una casa entran en una de estas tres categorías:</p>
<ul>
<li><strong>Fijos</strong>: alquiler, expensas, internet. Se conocen de antemano y se pagan todos los meses.</li>
<li><strong>Variables compartidos</strong>: luz, gas, agua, productos de limpieza, supermercado común.</li>
<li><strong>Individuales</strong>: la comida de cada uno, compras personales. No entran en la cuenta común.</li>
</ul>
<p>Parece obvio, pero la mayoría de los conflictos vienen de cosas que nadie clasificó: el papel higiénico, el aceite, el detergente, la suscripción de streaming que "usan todos".</p>

<h2>El alquiler: ¿partes iguales?</h2>
<p>Si las habitaciones son parecidas, dividir en partes iguales es lo más simple. Si no lo son, conviene ajustar. Algunos criterios habituales:</p>
<ul>
<li><strong>Tamaño de la habitación</strong>: quien tiene la más grande paga un poco más.</li>
<li><strong>Baño privado o balcón</strong>: suman al valor de la habitación.</li>
<li><strong>Cantidad de personas</strong>: si una pareja comparte una habitación, ocupa más espacio común y usa más servicios.</li>
<li><strong>Luz y ruido</strong>: la habitación que da a la calle o no tiene ventana puede valer menos.</li>
</ul>
<p>Una forma práctica: definir un porcentaje por habitación al inicio y mantenerlo mientras vivan juntos. Por ejemplo, 40/30/30 si una habitación tiene baño propio. Lo importante es que quede escrito y que lo acepten todos antes de mudarse.</p>

<h2>Servicios y supermercado</h2>
<p>Los servicios suelen dividirse en partes iguales. Si alguien trabaja desde casa todo el día y usa mucha más calefacción o aire acondicionado, puede tener sentido ajustarlo, pero conviene no complicarlo de más.</p>
<p>Para el supermercado hay dos modelos:</p>
<ol>
<li><strong>Todo compartido</strong>: se compra en conjunto y se divide entre todos. Funciona si los hábitos de consumo son parecidos y comen juntos seguido.</li>
<li><strong>Solo lo básico compartido</strong>: limpieza, papel, aceite, sal, café. Cada uno compra su comida. Es el modelo más estable cuando los horarios y las dietas son distintos.</li>
</ol>

<h2>Un mes completo, con números</h2>
<p>Tres roommates: Sol tiene la habitación con baño (40 %), Leo y Kim las otras dos (30 % cada uno). Los demás gastos se dividen en partes iguales.</p>
<table>
<thead><tr><th>Gasto</th><th>Pagó</th><th>División</th><th>Sol</th><th>Leo</th><th>Kim</th></tr></thead>
<tbody>
<tr><td>Alquiler 1.500</td><td>Sol</td><td>40/30/30</td><td>600</td><td>450</td><td>450</td></tr>
<tr><td>Expensas 150</td><td>Sol</td><td>40/30/30</td><td>60</td><td>45</td><td>45</td></tr>
<tr><td>Internet 60</td><td>Leo</td><td>Iguales</td><td>20</td><td>20</td><td>20</td></tr>
<tr><td>Luz 90</td><td>Kim</td><td>Iguales</td><td>30</td><td>30</td><td>30</td></tr>
<tr><td>Limpieza 45</td><td>Leo</td><td>Iguales</td><td>15</td><td>15</td><td>15</td></tr>
</tbody>
</table>
<p>Sol pagó 1.650 y le tocaban 725: le deben 925. Leo pagó 105 y le tocaban 560: debe 455. Kim pagó 90 y le tocaban 560: debe 470. Dos transferencias cierran el mes: Leo le paga 455 a Sol y Kim le paga 470 a Sol.</p>

<h2>Quién paga y cuándo se hacen cuentas</h2>
<p>Lo más ordenado es que cada gasto lo pague quien pueda en ese momento, lo anote, y una vez por mes se haga la cuenta general. Así nadie tiene que adelantar todo ni andar cobrando cada compra chica.</p>
<p>Con un registro compartido, el cálculo de fin de mes es automático: cada uno ve cuánto pagó, cuánto le tocaba y a quién tiene que transferir. Para que las transferencias sean rápidas, cada uno deja cargado su alias y quien paga lo copia de un toque.</p>
[[fig group | Los integrantes del grupo, cada uno con su alias para cobrar]]

<h2>Cuando alguien se muda</h2>
<p>Es el momento más delicado de una convivencia. Conviene tener resuelto de antemano:</p>
<ul>
<li><strong>El depósito</strong>: si lo puso una persona, se le devuelve a ella; si lo pusieron entre todos, se divide según lo aportado.</li>
<li><strong>Las deudas pendientes</strong>: se hace una repartida el día de la mudanza, para que quien se va quede saldado.</li>
<li><strong>Las cosas compradas en común</strong> (un microondas, una heladera): quien se queda puede comprarle su parte a quien se va, o se venden y se reparte.</li>
<li><strong>Los servicios a nombre de quien se va</strong>: hay que pasarlos a nombre de otro antes de que se vaya.</li>
</ul>

<h2>Reglas que evitan conflictos</h2>
<ul>
<li>Acordar por escrito cómo se divide cada tipo de gasto.</li>
<li>Revisar el acuerdo si cambia algo: llega una persona nueva, sube un servicio, alguien empieza a trabajar desde casa.</li>
<li>Saldar todos los meses: las deudas que se acumulan son las que terminan mal.</li>
<li>Si alguien no puede pagar un mes, hablarlo en ese momento, no dejarlo correr.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Qué hacemos con los invitados que se quedan varios días?</h3>
<p>Lo habitual es no cobrar nada por visitas cortas. Si una pareja de alguien pasa la mitad de la semana en la casa, es razonable que ese roommate aporte un poco más en servicios y súper.</p>
<h3>¿Conviene una cuenta bancaria compartida?</h3>
<p>Puede servir para el alquiler, pero agrega trámites y complica las cosas cuando alguien se muda. Para la mayoría de los grupos alcanza con un registro compartido y transferencias mensuales.</p>

<div class="tip"><strong>Tip:</strong> aunque TribuSplit nació para viajes, el mismo método sirve para la convivencia. Creen un grupo para el departamento, anoten los gastos del mes y hagan una repartida parcial a fin de mes: los gastos saldados quedan en el historial y el mes siguiente empieza de cero.</div>
`,
  },

  {
    slug: "hablar-de-plata-con-amigos",
    pair: "talking-about-money-with-friends",
    published: "2026-10-18",
    title: "Cómo hablar de plata con amigos (y cobrar sin incomodar)",
    desc: "Consejos prácticos para hablar de dinero en un grupo de amigos: acordar antes, pedir lo que te deben sin incomodar, mensajes de ejemplo y cómo resolver diferencias sin romper la amistad.",
    lead: "\"Cuentas claras conservan amistades\" es un dicho por algo. Hablar de plata incomoda, pero no hablarlo incomoda mucho más.",
    related: ["como-dividir-gastos-de-un-viaje", "minimizar-transferencias", "dividir-gastos-en-pareja"],
    body: `
<h2>Por qué cuesta tanto</h2>
<p>Pedirle dinero a un amigo puede sentirse como desconfianza, y reclamar una deuda chica parece mezquino. Por eso muchas personas prefieren absorber el gasto en silencio. El problema es que ese silencio no desaparece: con el tiempo se convierte en resentimiento, y un día aparece en forma de comentario ácido por algo que no tiene nada que ver.</p>
<p>Del otro lado pasa algo parecido. Quien debe muchas veces no sabe cuánto debe, o se olvidó, o le da vergüenza preguntar. Nadie habla, y la deuda queda flotando.</p>
<p>El problema no es la plata: es que no se habló. Estas son seis prácticas que lo hacen mucho más fácil.</p>

<h2>1. Hablen antes, no después</h2>
<p>El mejor momento para hablar de plata es antes de gastarla. Antes de un viaje, una salida o una compra compartida, acuerden:</p>
<ul>
<li>Cómo se va a dividir: partes iguales, cada uno lo suyo, o solo entre quienes participan.</li>
<li>Quién adelanta y cuándo se devuelve.</li>
<li>En qué moneda y con qué cotización, si aplica.</li>
</ul>
<p>Es mucho más fácil acordar reglas cuando nadie debe nada todavía. Y si alguien tiene un presupuesto más ajustado, es el momento de decirlo sin que suene a excusa.</p>

<h2>2. Usen un registro que todos vean</h2>
<p>Cuando los gastos están anotados en un lugar que todos ven, la conversación deja de ser "me debés" y pasa a ser "acá está lo que quedó". El registro despersonaliza el tema: no es una persona reclamando, son los números.</p>
<p>Además, elimina el problema de memoria. Nadie tiene que acordarse de quién pagó el taxi del martes: está anotado, con fecha y con quiénes iban.</p>

<h2>3. Pidan con naturalidad y con datos</h2>
<p>Si alguien no pagó, un mensaje directo y amable funciona mucho mejor que las indirectas. Tres ejemplos según la situación:</p>
<ul>
<li><strong>Para cerrar cuentas:</strong> <em>"¡Hola! Ya cerramos las cuentas del viaje. Te tocaba pasarme 120, te dejo mi alias por acá. ¡Gracias!"</em></li>
<li><strong>Para un recordatorio:</strong> <em>"Che, te escribo por lo del viaje, ¿pudiste ver lo de los 120? Sin apuro, es para tenerlo ordenado."</em></li>
<li><strong>Para un monto grande:</strong> <em>"Sé que es bastante. Si te sirve, lo dividimos en dos pagos, uno ahora y otro a fin de mes."</em></li>
</ul>
<p>Concreto, con el monto exacto y con la forma de pago. Facilitarle la transferencia al otro es la mitad del trabajo: si tiene que pedir el alias, buscar el número y calcular, lo va a postergar.</p>

<h2>4. Pongan un plazo razonable</h2>
<p>Hacer las cuentas en los primeros días después del viaje, con todo fresco, evita que las deudas se olviden. Y si el viaje es largo, una repartida a mitad de camino evita que alguien acumule una deuda grande.</p>
<p>Un buen acuerdo es "cerramos cuentas el domingo después de volver y cada uno paga esa semana". Simple, y nadie tiene que perseguir a nadie.</p>

<h2>5. Si hay diferencias, vuelvan a las reglas</h2>
<p>Si alguien siente que pagó de más o que un gasto no le corresponde, revisen juntos el registro y el acuerdo inicial. Muchas veces el desacuerdo es un malentendido: un gasto que se dividió entre todos cuando debía ser solo de algunos, o una cena que alguien pensó que era invitación.</p>
<p>Corregirlo es simple si está anotado: se edita el gasto, se recalculan los saldos y listo. Sin registro, es la palabra de uno contra la del otro.</p>

<h2>6. Confirmen los pagos</h2>
<p>Que quien recibe confirme cada transferencia cierra el tema para ambos: nadie se queda con la duda de si llegó o no, y nadie tiene que mandar capturas de pantalla al grupo.</p>
[[fig transfers | Quien debe marca "Ya pagué" y quien cobra confirma que lo recibió]]

<h2>Situaciones difíciles</h2>
<h3>El amigo que nunca paga</h3>
<p>Si es un patrón, conviene hablarlo en privado y sin acusar: "Noté que te cuesta cerrar las cuentas, ¿está todo bien? ¿Preferís que lo organicemos distinto?". A veces hay un problema económico detrás, y es mejor saberlo.</p>
<h3>El amigo que gana mucho más</h3>
<p>Puede proponer invitar cosas, pero no conviene que se vuelva la norma: quien gana menos puede sentirse en deuda. Una alternativa es elegir planes que todos puedan pagar y dejar los "gustos" para quien quiera.</p>
<h3>La deuda vieja que nadie menciona</h3>
<p>Si pasaron meses, es mejor decir "me había olvidado de esto, ¿lo cerramos?" que seguir callando. Ofrecer un plazo largo ayuda a que no suene a reclamo.</p>

<h2>Unirse al grupo sin crear una cuenta</h2>
<p>Una barrera común es que no todos quieren bajarse una app más. En TribuSplit cada amigo entra con el código del viaje, elige su nombre de la lista y listo: puede ver los gastos, cargar su alias y marcar sus pagos sin registrarse.</p>
[[fig join | Al entrar con el código, cada uno elige quién es en la lista del grupo]]

<p><strong>En pocas palabras:</strong> acuerdos antes de gastar, un registro que todos vean, pedidos concretos y amables, plazos claros y pagos confirmados. La amistad agradece la claridad.</p>
`,
  },

  {
    slug: "presupuesto-de-viaje-en-grupo",
    pair: "group-trip-budget",
    published: "2026-10-18",
    title: "Cómo armar el presupuesto de un viaje en grupo",
    desc: "Paso a paso para calcular cuánto cuesta un viaje en grupo por persona: gastos fijos, gastos diarios, imprevistos, cómo acordar el nivel de gasto y cómo controlar el presupuesto durante el viaje.",
    lead: "Un buen presupuesto no es adivinar una cifra: es separar lo que ya se sabe de lo que hay que estimar, y dejar margen para lo inesperado.",
    related: ["alquiler-costa-atlantica-en-grupo", "viajar-en-grupo-checklist", "seguro-de-viaje-en-grupo"],
    body: `
<h2>Por qué hace falta un presupuesto en grupo</h2>
<p>Cuando se viaja solo, el presupuesto es una decisión personal. En grupo, es un acuerdo: si cada uno imagina un viaje distinto (uno piensa en hostels y comida de súper, otro en hotel con desayuno y cenas afuera), los problemas aparecen el primer día. Armar el presupuesto juntos obliga a poner esas expectativas sobre la mesa antes de reservar.</p>
<p>No hace falta precisión de contador. Alcanza con un número aproximado por persona, separado en partes, que todos entiendan.</p>

<h2>1. Separen gastos fijos y gastos variables</h2>
<p>Los <strong>gastos fijos</strong> se conocen antes de salir: pasajes, alojamiento, alquiler de auto, seguro, excursiones reservadas. Los <strong>gastos variables</strong> dependen del día a día: comidas, transporte local, salidas, compras.</p>
<p>Los fijos se suman y se dividen por la cantidad de personas. Los variables se estiman por día y por persona. Mezclarlos es el error más común: el alojamiento no depende de cuántos días salgan a cenar, y las cenas no dependen de cuánto costó el alojamiento.</p>

<h2>2. Estimen el gasto diario por persona</h2>
<p>Para los gastos variables, piensen en un día típico del viaje y estimen:</p>
<ul>
<li><strong>Comidas</strong>: desayuno, almuerzo, cena y algún snack. Cocinar algunas comidas en el alojamiento baja mucho este número.</li>
<li><strong>Transporte local</strong>: taxis, aplicaciones, transporte público, combustible, estacionamiento, peajes.</li>
<li><strong>Actividades</strong>: entradas, alquileres de equipo, propinas.</li>
<li><strong>Salidas</strong>: bares, cafés, gustos.</li>
</ul>
<p>Multipliquen ese gasto diario por la cantidad de días. Si no conocen el destino, busquen precios de supermercados y restaurantes en foros de viajeros o en sitios de reseñas para calibrar la estimación. Un buen truco: estimen tres niveles (ajustado, normal, cómodo) y elijan juntos.</p>

<h2>3. Sumen un margen para imprevistos</h2>
<p>Siempre aparece algo: una excursión que no estaba en los planes, un taxi de madrugada, una farmacia, un día de lluvia que obliga a cambiar todo. Un margen del 10 al 15 % sobre el total suele alcanzar para viajes cortos. En viajes largos o a destinos con precios inestables, conviene un poco más.</p>

<h2>4. Pónganse de acuerdo en el nivel de gasto</h2>
<p>Este es el punto más delicado. Si una persona quiere cenar en restaurantes caros todos los días y otra prefiere cocinar, el presupuesto no va a cerrar para ambas. Algunas opciones que funcionan:</p>
<ul>
<li>Acordar un nivel "base" común y que los gustos extra se paguen individualmente.</li>
<li>Alternar: algunas comidas compartidas en el alojamiento y algunas salidas.</li>
<li>Dividir solo entre quienes participan de cada actividad, en vez de repartir todo entre todos.</li>
</ul>
<p>Lo que no funciona es asumir que "ya vamos viendo": en el viaje, nadie quiere ser quien dice que algo es muy caro.</p>

<h2>Ejemplo completo: una semana, cuatro personas</h2>
<table>
<thead><tr><th>Concepto</th><th>Total del grupo</th><th>Por persona</th></tr></thead>
<tbody>
<tr><td>Alojamiento 6 noches</td><td>1.200</td><td>300</td></tr>
<tr><td>Auto y combustible</td><td>480</td><td>120</td></tr>
<tr><td>Gastos diarios (40 por persona × 6 días)</td><td>960</td><td>240</td></tr>
<tr><td>Imprevistos (12 %)</td><td>317</td><td>79</td></tr>
<tr><td><strong>Total</strong></td><td><strong>2.957</strong></td><td><strong>739</strong></td></tr>
</tbody>
</table>
<p>Las cifras son de ejemplo, en cualquier moneda: lo útil es la estructura. Con este cuadro, cada uno sabe que tiene que tener disponibles unos 740 para el viaje, y que unos 420 se van a ir antes de salir (alojamiento y auto).</p>

<h2>5. No olviden los gastos antes del viaje</h2>
<p>Las señas, los pasajes y las entradas se pagan semanas antes, casi siempre con la tarjeta de una sola persona. Anótenlos apenas se pagan, con su fecha real: son parte del viaje y deben entrar en la repartida. En TribuSplit aparecen agrupados como "Antes del viaje" y no cuentan para el promedio por día.</p>

<h2>6. Controlen el gasto durante el viaje</h2>
<p>El presupuesto sirve si se compara con lo real. Anotar cada gasto en una app compartida permite ver, en cualquier momento, cuánto se gastó en total, por categoría y por día.</p>
[[fig expenses | El total del viaje, el día en curso y el promedio gastado por día]]
<p>Si a mitad de viaje el gasto en comidas viene muy por encima de lo previsto, todavía hay tiempo de ajustar: una cena en casa, un día de playa en lugar de excursión. Darse cuenta al volver no sirve de nada.</p>
[[fig summary | El resumen por categoría muestra dónde se va la plata]]

<h2>Errores comunes</h2>
<ul>
<li><strong>Presupuestar solo el alojamiento y los pasajes.</strong> En viajes cortos, los gastos diarios pueden igualar o superar a los fijos.</li>
<li><strong>Usar precios de hace años.</strong> Busquen información reciente; en algunos destinos los precios cambian rápido.</li>
<li><strong>No contar el tipo de cambio y las comisiones</strong> si se viaja al exterior. Ver <a href="/guias/gastos-en-distintas-monedas/">cómo manejar gastos en distintas monedas</a>.</li>
<li><strong>No dejar margen.</strong> Un presupuesto exacto se rompe con el primer imprevisto.</li>
</ul>

<div class="tip"><strong>Clave:</strong> presupuesto acordado antes, gastos anotados durante y una mirada al resumen a mitad de camino. Así el viaje no termina con sorpresas.</div>
`,
  },

  {
    slug: "viajar-en-grupo-checklist",
    pair: "group-trip-planning-checklist",
    published: "2026-10-18",
    title: "Checklist para organizar un viaje en grupo",
    desc: "Lista completa para organizar un viaje con amigos o familia: fechas, presupuesto, reservas, documentos, gastos compartidos y convivencia, ordenada por etapas.",
    lead: "Organizar un viaje en grupo tiene más partes móviles que viajar solo. Esta lista ordena las decisiones para que nada quede librado al último momento.",
    related: ["presupuesto-de-viaje-en-grupo", "alquiler-costa-atlantica-en-grupo", "como-dividir-gastos-de-un-viaje"],
    body: `
<h2>Antes de empezar: quién organiza qué</h2>
<p>El error más común en los viajes grupales es que una sola persona termina organizando todo: buscando alojamiento, comparando pasajes, armando el itinerario, cobrando las señas. Llega al viaje cansada y con la sensación de que nadie ayudó.</p>
<p>Repartir la organización desde el principio cambia todo. Una forma simple: una persona se encarga del alojamiento, otra del transporte, otra de las actividades y otra de las cuentas. Cada una propone opciones y el grupo decide.</p>

<h2>Con varios meses de anticipación</h2>
<ul>
<li><strong>Definan quiénes viajan</strong> y quién coordina cada tema.</li>
<li><strong>Elijan fechas</strong> que funcionen para todos. Una encuesta en el grupo de mensajes ahorra idas y vueltas. Si alguien no puede todos los días, decidan si viaja menos días o si se mueven las fechas.</li>
<li><strong>Acuerden un presupuesto aproximado</strong> por persona. Es la conversación más importante: si las expectativas de gasto son muy distintas, mejor saberlo antes. Hay ideas en <a href="/guias/presupuesto-de-viaje-en-grupo/">cómo armar el presupuesto de un viaje en grupo</a>.</li>
<li><strong>Revisen documentos</strong>: pasaportes vigentes (muchos países piden al menos seis meses de vigencia), visas, permisos para menores y requisitos de ingreso del destino.</li>
<li><strong>Decidan el tipo de viaje</strong>: ¿base fija o itinerante? ¿Mucha actividad o descanso? Dos personas con ideas opuestas sobre esto pueden arruinarle el viaje al resto.</li>
</ul>

<h2>Uno o dos meses antes</h2>
<ul>
<li><strong>Reserven alojamiento y transporte principal</strong>. Para grupos, una casa o departamento entero suele salir más barato por persona que varias habitaciones de hotel, y da un espacio común para cocinar y juntarse. Si van a la costa, hay ideas concretas en <a href="/guias/alquiler-costa-atlantica-en-grupo/">alquiler en la Costa Atlántica en grupo</a>.</li>
<li><strong>Decidan cómo se van a repartir los gastos</strong>: qué se divide entre todos, qué paga cada uno, y en qué moneda se saldan las deudas.</li>
<li><strong>Creen el grupo de gastos</strong> y sumen a todos, así el que adelanta una reserva ya puede anotarla.</li>
<li><strong>Contraten un seguro de viaje</strong> si salen del país. Revisen qué cubre y si incluye actividades de riesgo si van a hacerlas: hay una lista de qué mirar en <a href="/guias/seguro-de-viaje-en-grupo/">seguro de viaje para viajar en grupo</a>.</li>
</ul>
[[fig new-trip | Crear el viaje: destino, fechas y moneda, en tres pasos]]
<p>Al crear el viaje en TribuSplit se elige el país (la moneda local se completa sola), las fechas y en qué moneda se van a pagar entre ustedes. Después se comparte un código de seis letras y cada uno se suma eligiendo su nombre.</p>
[[fig group | El código de invitación y la lista de integrantes del grupo]]

<h2>La semana previa</h2>
<ul>
<li>Confirmen reservas y horarios de traslados.</li>
<li>Revisen las comisiones de su tarjeta por compras en otra moneda y avisen al banco si hace falta.</li>
<li>Lleven algo de efectivo en moneda local para los primeros gastos (taxi, propinas).</li>
<li>Compartan una lista de equipaje común para no llevar cinco secadores y ningún cargador. Botiquín, adaptadores y protector solar suelen ser compartidos.</li>
<li>Cada uno carga su alias o cuenta para recibir transferencias.</li>
<li>Descarguen mapas offline y guarden las reservas en el teléfono.</li>
</ul>

<h2>Durante el viaje</h2>
<ul>
<li><strong>Anoten cada gasto en el momento</strong>, con quién pagó y entre quiénes se divide.</li>
<li>Si el viaje es largo, hagan una <strong>repartida parcial</strong> a mitad de camino.</li>
<li>Respeten los tiempos de cada uno: no todos quieren hacer todo juntos, y está bien. Un día libre a mitad del viaje le baja la tensión a cualquier grupo.</li>
<li>Guarden comprobantes de los gastos grandes (alojamiento, autos, excursiones) por si hay que reclamar algo.</li>
<li>Roten las tareas comunes: cocinar, lavar, manejar.</li>
</ul>

<h2>Al volver</h2>
<ul>
<li>Hagan la <strong>repartida final</strong> en los primeros días, con la memoria fresca.</li>
<li>Cada uno confirma los pagos que recibe.</li>
<li>Revisen el resumen: saber en qué se fue el dinero sirve para planear mejor el próximo viaje.</li>
<li>Compartan las fotos en un álbum común antes de que se pierdan en cuatro teléfonos distintos.</li>
</ul>

<h2>Checklist rápido para imprimir</h2>
<table>
<thead><tr><th>Etapa</th><th>Tarea</th></tr></thead>
<tbody>
<tr><td>Meses antes</td><td>Quiénes viajan, fechas, presupuesto, documentos, tipo de viaje</td></tr>
<tr><td>1–2 meses antes</td><td>Alojamiento, transporte, reglas de gastos, grupo de gastos, seguro</td></tr>
<tr><td>Semana previa</td><td>Confirmaciones, tarjetas, efectivo, equipaje común, alias, mapas</td></tr>
<tr><td>Durante</td><td>Anotar gastos, repartida parcial, tiempos libres, comprobantes</td></tr>
<tr><td>Al volver</td><td>Repartida final, confirmar pagos, resumen, fotos</td></tr>
</tbody>
</table>

<div class="tip"><strong>Consejo:</strong> la mayoría de los conflictos en viajes grupales no vienen de los destinos ni de las actividades, sino de expectativas de gasto distintas y cuentas poco claras. Hablarlo antes es la mejor inversión del viaje.</div>
`,
  },

  {
    slug: "pagar-en-brasil-pix-tarjeta-efectivo",
    pair: null,
    published: "2026-10-25",
    title: "Cómo pagar en Brasil siendo argentino: Pix, tarjeta o efectivo",
    desc: "Qué conviene usar para pagar en Brasil: Pix desde billeteras argentinas, tarjeta o reales en efectivo. Cómo funciona cada uno, qué cotización se aplica y cómo repartir los gastos con tu grupo.",
    lead: "En Brasil casi todo se paga con Pix, y desde hace poco también se puede pagar así desde billeteras argentinas. Pero no es la única opción, y la más cómoda no siempre es la más barata.",
    related: ["dolar-tarjeta-mep-blue-viajar", "gastos-en-distintas-monedas", "seguro-de-viaje-en-grupo"],
    body: `
<h2>Qué es Pix y por qué está en todos lados</h2>
<p>Pix es el sistema de pagos instantáneos del Banco Central de Brasil. Funciona con un código QR o con una "chave" (un alias: puede ser un teléfono, un email o un número de documento) y la plata llega en segundos. Para los brasileños reemplazó en gran parte al efectivo y a la tarjeta de débito: lo aceptan desde un restaurante hasta el puesto de la playa que vende cocos.</p>
<p>Para un turista eso cambia la forma de pagar. En lugares chicos, que antes solo aceptaban efectivo, hoy muchas veces hay un QR de Pix pegado en el mostrador.</p>

<h2>Cómo pagar con Pix desde Argentina</h2>
<p>Desde fines de 2025, varias billeteras virtuales argentinas permiten escanear un QR de Pix y pagar con saldo en pesos. Mercado Pago lo anunció para el verano 2026, y otras como Ualá, Prex, Belo o Lemon también ofrecen la función. El funcionamiento es parecido en todas:</p>
<ol>
<li>Abrís la app y elegís pagar con Pix.</li>
<li>Escaneás el QR del comercio o ingresás su chave.</li>
<li>La app muestra el monto en reales y cuánto te va a debitar en pesos.</li>
<li>Confirmás y el pago se acredita al instante.</li>
</ol>
<p>Dos detalles importantes. Primero, la función se fue habilitando de forma gradual, así que conviene <strong>comprobar antes de viajar</strong> que aparece en tu app. Segundo, el pago se hace en reales pero se debita en pesos, con <strong>una cotización que define cada billetera</strong>. Antes de usarla para gastos grandes, compará esa cotización con la del dólar tarjeta o la del MEP del día.</p>

<h2>Tarjeta argentina</h2>
<p>La tarjeta de crédito o débito sigue funcionando en casi todo comercio establecido: hoteles, restaurantes, supermercados, estaciones de servicio. Si pagás en reales con una tarjeta argentina en pesos, el consumo se convierte con el <strong>dólar tarjeta</strong>, es decir, el oficial más los impuestos y percepciones vigentes. Si tenés dólares en el banco, muchas tarjetas permiten pagar el resumen en dólares y evitar esa conversión.</p>
<p>Cuando la terminal ofrezca cobrarte "en pesos argentinos" en lugar de reales, elegí reales: esa conversión en el momento suele tener una cotización peor. Lo explicamos en la guía de <a href="/en/guides/paying-abroad-cards-cash-fees/">pagos en el exterior</a> (en inglés).</p>

<h2>Efectivo en reales</h2>
<p>El efectivo pierde terreno en Brasil, pero sigue siendo útil para propinas, vendedores ambulantes y lugares donde falla la señal. Se puede llevar desde Argentina (comprando reales o llevando dólares para cambiar allá) o sacar de un cajero con tarjeta, con las comisiones del banco y del cajero.</p>
<p>No hace falta llevar mucho: alcanza con algo para los primeros días y para imprevistos.</p>

<h2>Comparación rápida</h2>
<table>
<thead><tr><th>Medio</th><th>Dónde sirve</th><th>Cotización</th><th>Lo bueno</th><th>Lo malo</th></tr></thead>
<tbody>
<tr><td>Pix desde billetera</td><td>Casi todo comercio, incluso los más chicos</td><td>La que define la billetera</td><td>Rápido, sin llevar efectivo</td><td>Depende de la app y de tener datos</td></tr>
<tr><td>Tarjeta en pesos</td><td>Comercios establecidos</td><td>Dólar tarjeta</td><td>Aceptada casi siempre</td><td>Suele ser la cotización más cara</td></tr>
<tr><td>Tarjeta pagando en dólares</td><td>Comercios establecidos</td><td>Lo que te costaron tus dólares</td><td>Evita la conversión a pesos</td><td>Necesitás dólares en el banco</td></tr>
<tr><td>Efectivo en reales</td><td>Todo, sin señal ni app</td><td>La que conseguiste al cambiar</td><td>Plan B universal</td><td>Riesgo de pérdida; mal cambio en aeropuertos</td></tr>
</tbody>
</table>
<p>La combinación que mejor funciona para la mayoría: <strong>Pix para el día a día, tarjeta para los gastos grandes y algo de efectivo como respaldo</strong>. Y siempre un plan B, porque no todos los comercios aceptan todos los medios y la app puede fallar.</p>

<h2>Si viajás en grupo: cómo repartir pagos hechos de formas distintas</h2>
<p>En un grupo es casi seguro que cada uno va a pagar distinto: uno con Pix, otro con tarjeta, otro con efectivo. Cada medio tiene su propia cotización, y tratar de reflejar eso gasto por gasto complica las cuentas. Lo que funciona:</p>
<ol>
<li><strong>Anotar cada gasto en reales</strong>, el monto del ticket, sin importar cómo se pagó.</li>
<li>Calcular saldos y transferencias en reales.</li>
<li>Al volver, <strong>pasar a pesos con una sola cotización acordada</strong>. La guía <a href="/guias/dolar-tarjeta-mep-blue-viajar/">qué dólar usar para repartir</a> explica cómo elegirla.</li>
</ol>
[[fig add-expense | Los gastos se cargan en reales, la moneda del destino, sin importar cómo se pagaron]]
<p>Si quien adelantó la mayoría de los gastos pagó con tarjeta, lo justo suele ser una cotización cercana al dólar tarjeta. Si la mayoría pagó con Pix, la cotización que les dio la billetera es una buena referencia.</p>
[[fig settle-fx | Al repartir en pesos se elige la cotización y queda fija para esa repartida]]

<h2>Antes de viajar</h2>
<ul>
<li>Revisá que tu billetera tenga habilitado el pago con Pix y probá con un monto chico.</li>
<li>Activá tu tarjeta para usar en el exterior si tu banco lo pide.</li>
<li>Llevá una segunda tarjeta o medio de pago, de otro banco.</li>
<li>Asegurate de tener datos en el teléfono: sin conexión no hay Pix.</li>
<li>Acordá con tu grupo en qué moneda y con qué cotización se van a saldar las deudas.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Necesito una cuenta en Brasil para usar Pix?</h3>
<p>No para pagar desde las billeteras argentinas que lo ofrecen: la billetera hace de intermediaria. Para recibir pagos por Pix sí hace falta una cuenta brasileña.</p>
<h3>¿Pix es más barato que la tarjeta?</h3>
<p>Depende de la cotización que aplique la billetera ese día comparada con el dólar tarjeta. Muchas veces conviene, pero no siempre: comparalo en la app antes de pagar algo grande.</p>
<h3>¿Puedo pagarle a un amigo del grupo por Pix?</h3>
<p>Solo si tiene una cuenta brasileña. Entre argentinos, lo práctico es saldar al volver con transferencias en pesos.</p>

<p class="meta">Fuentes: <a href="https://news.mercadolibre.com/pagar-con-pix-en-brasil-con-mercado-pago-argentina" rel="noopener">Mercado Libre: pagar con Pix en Brasil con Mercado Pago</a>; <a href="https://www.infobae.com/economia/2025/12/26/reales-tarjeta-y-pix-como-conviene-pagar-en-brasil-durante-el-verano-2026/" rel="noopener">Infobae: reales, tarjeta y Pix</a>. Esta guía es informativa y no es asesoramiento financiero; las funciones de cada billetera y la normativa cambiaria pueden cambiar.</p>
`,
  },

  {
    slug: "seguro-de-viaje-en-grupo",
    pair: "group-travel-insurance",
    published: "2026-10-25",
    title: "Seguro de viaje para viajar en grupo: qué revisar antes de contratar",
    desc: "Qué mirar en un seguro o asistencia al viajero cuando viajan en grupo: coberturas médicas, preexistencias, deportes, cancelación, y si hace falta para viajar a Brasil. Con una tabla para comparar planes.",
    lead: "Un seguro de viaje es de esas cosas que nadie quiere usar y todos agradecen tener. En grupo, además, hay que decidir si cada uno contrata el suyo o si se compra para todos.",
    related: ["viajar-en-grupo-checklist", "presupuesto-de-viaje-en-grupo", "pagar-en-brasil-pix-tarjeta-efectivo"],
    body: `
<h2>Seguro de viaje y asistencia al viajero: ¿son lo mismo?</h2>
<p>En la práctica se usan como sinónimos, pero no siempre funcionan igual. Una <strong>asistencia al viajero</strong> suele coordinar y pagar directamente la atención: te deriva a un médico o clínica de su red. Un <strong>seguro de viaje</strong> a veces funciona por reintegro: pagás vos y después te devuelven lo cubierto. Antes de contratar, conviene saber cuál de los dos modelos tiene el plan, porque cambia mucho cuánta plata tenés que tener disponible si pasa algo.</p>

<h2>¿Hace falta para viajar a Brasil?</h2>
<p>Según la información difundida para turistas argentinos, para entrar a Brasil como turista alcanza con el DNI o el pasaporte vigentes y no se exige un seguro médico de viaje. La excepción conocida es <strong>quien viaja en auto</strong>: el vehículo necesita un seguro con cobertura en el Mercosur que incluya responsabilidad civil.</p>
<p>Que no sea obligatorio no significa que no convenga. Una atención privada de urgencia, una internación o un traslado pueden costar mucho más que el seguro de todo el grupo. Antes de viajar, verificá los requisitos vigentes en fuentes oficiales, porque pueden cambiar.</p>

<h2>Qué revisar en cualquier plan</h2>
<table>
<thead><tr><th>Punto</th><th>Qué preguntar</th></tr></thead>
<tbody>
<tr><td>Tope de cobertura médica</td><td>¿Cuál es el monto máximo por persona y por evento? ¿Alcanza para una internación en el destino?</td></tr>
<tr><td>Forma de atención</td><td>¿Pagan directo o por reintegro? ¿Cómo se pide asistencia: app, WhatsApp, teléfono?</td></tr>
<tr><td>Preexistencias</td><td>¿Cubre enfermedades previas, aunque sea con un tope menor? Es la exclusión más común.</td></tr>
<tr><td>Deportes y actividades</td><td>¿Cubre surf, buceo, trekking o moto? Muchos planes los excluyen o los cobran aparte.</td></tr>
<tr><td>Medicamentos y odontología</td><td>¿Hay tope específico? Suelen ser bajos.</td></tr>
<tr><td>Equipaje</td><td>¿Cubre pérdida o demora del equipaje en el vuelo? ¿Con qué monto?</td></tr>
<tr><td>Cancelación</td><td>¿Devuelve lo pagado si tenés que cancelar el viaje por enfermedad o fuerza mayor?</td></tr>
<tr><td>Edad y embarazo</td><td>¿Hay límites o recargos por edad? ¿Cubre urgencias durante el embarazo?</td></tr>
<tr><td>Franquicia o deducible</td><td>¿Hay un monto que pagás vos antes de que cubra el seguro?</td></tr>
</tbody>
</table>
<p>Leé las exclusiones con la misma atención que las coberturas. Ahí está la diferencia entre dos planes que parecen iguales.</p>

<h2>En grupo: ¿un plan para todos o cada uno el suyo?</h2>
<p>Hay dos formas de hacerlo, y las dos funcionan:</p>
<ul>
<li><strong>Cada uno contrata el suyo.</strong> Permite que cada persona elija según su edad, su salud y las actividades que va a hacer. Es lo más simple para las cuentas: no entra en la repartida.</li>
<li><strong>Uno contrata para todos.</strong> Algunas empresas hacen descuentos por grupo o por familia. Quien paga lo anota como un gasto del viaje dividido entre todos los asegurados, y se salda con el resto de las cuentas.</li>
</ul>
<p>Si uno contrata para todos, asegurate de que cada persona tenga su número de póliza y el contacto de asistencia en su propio teléfono. En una urgencia no hay tiempo de buscar a quien hizo la compra.</p>
[[fig add-expense | Si uno paga el seguro de todos, se carga como un gasto más y se divide entre los asegurados]]

<h2>Cuánto presupuestar</h2>
<p>El costo depende de la duración, el destino, la edad y las coberturas, así que no hay un número universal. Para el presupuesto del grupo conviene cotizar dos o tres planes con las mismas fechas y sumar el elegido como gasto fijo por persona, igual que el alojamiento. La guía <a href="/guias/presupuesto-de-viaje-en-grupo/">cómo armar el presupuesto de un viaje en grupo</a> muestra cómo ordenar esos gastos.</p>

<h2>Antes de salir</h2>
<ul>
<li>Guardá la póliza en PDF en el teléfono y el número de asistencia en los contactos.</li>
<li>Compartí con el grupo los datos de contacto de la asistencia de cada uno.</li>
<li>Si tenés tarjetas de crédito con asistencia incluida, revisá qué cubren y qué hay que hacer para activarla (muchas exigen haber pagado el pasaje con esa tarjeta).</li>
<li>Si alguien tiene una condición médica, que lo sepa al menos otra persona del grupo.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿La asistencia de la tarjeta de crédito alcanza?</h3>
<p>A veces sí, a veces no. Suelen tener topes más bajos y condiciones de activación. Compará sus coberturas con la tabla de arriba antes de decidir.</p>
<h3>¿Qué hago si tengo que usarlo?</h3>
<p>Primero, contactá a la asistencia antes de ir a cualquier clínica (salvo una emergencia grave): muchos planes solo cubren si te derivan ellos. Guardá todos los comprobantes.</p>

<p class="meta">Esta guía es informativa y no constituye asesoramiento legal ni de seguros. Los requisitos de ingreso y las condiciones de cada plan cambian: verificá la información vigente antes de viajar.</p>
`,
  },

  {
    slug: "alquiler-costa-atlantica-en-grupo",
    pair: null,
    published: "2026-10-25",
    title: "Alquiler en la Costa Atlántica en grupo: cómo organizar y dividir alquiler, nafta y comidas",
    desc: "Cómo organizar un viaje en grupo a Pinamar, Villa Gesell, Miramar o cualquier lugar de la Costa Atlántica: alquilar la casa, dividir el alquiler si alguien llega después, repartir la nafta entre autos y no perder el control de los gastos del día a día.",
    lead: "Una casa en la costa con amigos es de los mejores planes del verano, y también de los que más cuentas cruzadas generan: alquiler, nafta, súper, asados y salidas, entre seis u ocho personas y durante varios días.",
    related: ["presupuesto-de-viaje-en-grupo", "como-dividir-gastos-de-un-viaje", "minimizar-transferencias"],
    body: `
<h2>La experiencia detrás de esta guía</h2>
<p>Hice unos cinco viajes en grupo a la Costa Atlántica: varias veces a Pinamar, a Villa Gesell y a Miramar con Chapadmalal. Fuimos de a ocho, de a seis y de a cuatro. En todos se repetía lo mismo: lo que había que dividir era la nafta del viaje, las comidas y las salidas, y lo difícil no era el monto sino el desorden.</p>
<p>Cuando el viaje es largo o el grupo es grande, en un mismo día hay muchos gastos: alguien carga nafta, otro hace el súper, a la noche se sale y paga uno con tarjeta. Al tercer día ya nadie se acuerda quién puso qué, y si alguien propone "hagamos cuentas de lo que llevamos hasta ahora", la cuenta se vuelve desprolija. De ahí salió %BRAND%, y de ahí sale esta guía.</p>

<h2>1. Elegir y alquilar la casa</h2>
<p>Para grupos de seis u ocho, una casa entera suele salir bastante más barata por persona que varios departamentos o habitaciones de hotel, y tiene algo que vale mucho: un lugar común para cocinar, hacer asados y juntarse antes de salir.</p>
<p>Antes de señar, conviene revisar:</p>
<ul>
<li><strong>Camas reales</strong>, no "capacidad máxima". Una casa "para 8" con dos sillones cama no es lo mismo que una con ocho camas.</li>
<li><strong>Qué incluye</strong>: ropa de cama y toallas, wifi, cochera o lugar para los autos, parrilla, limpieza final.</li>
<li><strong>Distancia a la playa y al centro</strong>. Si hay que usar el auto para todo, se suma nafta y estacionamiento.</li>
<li><strong>Condiciones de la seña y del depósito</strong>: cuánto se paga al reservar, cuándo se paga el resto, cuánto es el depósito en garantía y cuándo se devuelve.</li>
<li><strong>Fechas de entrada y salida</strong>: en temporada alta muchos alquileres son por semana o por quincena completa.</li>
</ul>
<p>Pidan todo por escrito, aunque sea por mensaje: precio total, fechas, qué incluye y qué pasa si hay que cancelar.</p>

<h2>2. La seña y el depósito: quién los paga y cómo se anotan</h2>
<p>Casi siempre una sola persona transfiere la seña, semanas antes del viaje. Es el gasto que más fácil se olvida, porque cuando llega el viaje ya pasó un mes. Anótenlo apenas se paga, con su fecha real. En la app aparece agrupado como "Antes del viaje" y entra en la repartida igual que el resto.</p>
<p>El <strong>depósito en garantía</strong> es distinto: no es un gasto, porque se devuelve al final si no hay daños. Lo más simple es que lo ponga una persona y lo recupere ella misma al irse. Si lo ponen entre todos, que cada uno sepa cuánto puso para devolvérselo. Si al final descuentan algo por un daño, ese descuento sí es un gasto del grupo.</p>

<h2>3. Dividir el alquiler cuando no todos están todas las noches</h2>
<p>Pasa seguido: dos del grupo tienen que trabajar y llegan unos días después. ¿Pagan lo mismo? Lo más justo es pensar que la casa cuesta lo mismo cada noche, y que esa noche la pagan los que están.</p>
<p>Un ejemplo con números ilustrativos: casa para ocho, diez noches, $1.600.000 en total ($160.000 por noche). Seis llegan el primer día; dos llegan para la cuarta noche.</p>
<table>
<thead><tr><th>Tramo</th><th>Costo</th><th>Se divide entre</th><th>A cada uno</th></tr></thead>
<tbody>
<tr><td>Noches 1 a 3</td><td>$480.000</td><td>Los 6 que están</td><td>$80.000</td></tr>
<tr><td>Noches 4 a 10</td><td>$1.120.000</td><td>Los 8</td><td>$140.000</td></tr>
</tbody>
</table>
<p>Los seis que estuvieron todo el viaje pagan $220.000 cada uno; los dos que llegaron después, $140.000. La suma da exactamente $1.600.000.</p>
<p>En la app se resuelve cargando el alquiler como dos gastos, uno por tramo, cada uno dividido entre quienes estaban. No hace falta ninguna fórmula.</p>
<p>Otras situaciones comunes:</p>
<ul>
<li><strong>Una pareja comparte habitación</strong>: lo habitual es que pague igual que el resto por persona, porque usan la casa igual. Si la habitación es claramente mejor (en suite, con vista), pueden acordar un extra.</li>
<li><strong>Alguien se va antes</strong>: mismo criterio, por tramos. Y conviene hacer una repartida parcial el día que se va.</li>
</ul>

<h2>4. La nafta y los peajes, auto por auto</h2>
<p>Desde Buenos Aires hay unos 350 a 450 kilómetros según el destino, así que la nafta y los peajes son de los gastos más grandes del viaje después del alquiler. Con ocho personas suelen ser dos autos, y ahí aparece la pregunta: ¿cada auto divide lo suyo o se junta todo?</p>
<table>
<thead><tr><th>Opción</th><th>Cómo funciona</th><th>Cuándo conviene</th></tr></thead>
<tbody>
<tr><td>Cada auto lo suyo</td><td>La nafta y los peajes de cada auto se dividen entre quienes viajaron en él</td><td>Si los autos consumen muy distinto o hicieron recorridos distintos</td></tr>
<tr><td>Todo junto</td><td>Se suma la nafta de todos los autos y se divide entre todo el grupo</td><td>Si los autos son parecidos y el grupo prefiere no complicarse</td></tr>
</tbody>
</table>
<p>Ejemplo ilustrativo con dos autos de cuatro personas: el auto A gastó $120.000 entre nafta y peajes y el auto B $100.000. Con "cada auto lo suyo", los del auto A pagan $30.000 y los del B $25.000. Con "todo junto", todos pagan $27.500.</p>
<p>Algunos grupos suman algo para el dueño del auto por el desgaste. No es obligatorio, pero si se hace, que se acuerde antes de salir.</p>
<p>Durante la estadía, la nafta de las salidas en auto (ir a otra playa, a cenar al centro) se divide entre quienes fueron en ese viaje.</p>

<h2>5. Súper, asados y salidas: el día a día</h2>
<p>Acá es donde se pierde el control. En un día cualquiera puede haber:</p>
<ul>
<li>la compra grande del súper, que se divide entre todos;</li>
<li>la carne y el carbón del asado, entre todos los que comieron;</li>
<li>helados o facturas que compró uno para todos;</li>
<li>la salida de la noche, donde fueron cinco de los ocho;</li>
<li>un taxi de vuelta, entre los cuatro que volvieron juntos.</li>
</ul>
<p>Cinco gastos, cinco combinaciones distintas de personas, y eso en un solo día. Multiplicado por diez días, es imposible reconstruirlo de memoria. La única forma que funciona es <strong>anotar cada gasto en el momento</strong>, eligiendo entre quiénes se divide.</p>
[[fig add-expense | Cada gasto se anota con quién pagó y entre quiénes se divide: el asado entre todos, la salida solo entre los que fueron]]
<p>No hace falta que una persona haga de contador. Cualquiera puede cargar un gasto, incluso en nombre de otro: "Tomás pagó el súper, lo anoto yo".</p>
[[fig expenses | Los gastos de cada día, con el total del viaje y el promedio diario]]

<h2>6. Hacer cuentas a mitad de viaje sin desordenarse</h2>
<p>En viajes de una semana o más, alguien siempre propone "hagamos cuentas de lo que llevamos". Es buena idea: quien pagó el alquiler o la compra grande recupera la plata antes, y nadie acumula una deuda grande. El problema es hacerlo a mano, porque al final del viaje hay que acordarse de qué ya se pagó y qué no.</p>
<p>Con la app es un botón: "Repartir hasta hoy" toma todo lo pendiente, calcula quién le paga a quién con la menor cantidad de transferencias y deja esos gastos saldados. Los gastos de los días siguientes empiezan de cero, y el resumen del viaje sigue mostrando todo.</p>
[[fig settle | La repartida parcial muestra los pagos antes de confirmar]]

<h2>7. Al volver: la repartida final y el resumen</h2>
<p>El último día, o apenas vuelven, hagan la repartida final. Cada uno ve cuánto le toca pagar y a quién, copia el alias y transfiere. Quien recibe confirma, y el viaje queda cerrado.</p>
<p>El resumen por categoría y por día sirve para el año siguiente: cuánto se fue en alquiler, en nafta, en comida y en salidas. Con eso el presupuesto del próximo viaje deja de ser una adivinanza.</p>
[[fig summary | El resumen del viaje, útil para planificar el próximo verano]]

<h2>Presupuesto de ejemplo para ocho personas</h2>
<p>Una estructura para armar el presupuesto propio. Los montos son ilustrativos: cambian mucho según el destino, la quincena y el año, así que usen los números reales de su alquiler y sus autos.</p>
<table>
<thead><tr><th>Concepto</th><th>Cómo se divide</th><th>Cuándo se paga</th></tr></thead>
<tbody>
<tr><td>Alquiler</td><td>Por noches presentes</td><td>Seña antes; resto al llegar o antes</td></tr>
<tr><td>Nafta y peajes de ida y vuelta</td><td>Por auto o todo junto</td><td>En el viaje</td></tr>
<tr><td>Súper y asados</td><td>Entre todos los que comen</td><td>Durante la estadía</td></tr>
<tr><td>Salidas</td><td>Solo entre los que van</td><td>Durante la estadía</td></tr>
<tr><td>Imprevistos (10 a 15 %)</td><td>Según el gasto</td><td>Durante la estadía</td></tr>
</tbody>
</table>
<p>Para armar los números paso a paso, ver <a href="/guias/presupuesto-de-viaje-en-grupo/">cómo armar el presupuesto de un viaje en grupo</a>.</p>

<h2>Errores que vimos repetirse</h2>
<ul>
<li><strong>Olvidar la seña</strong> porque se pagó un mes antes.</li>
<li><strong>Dividir la salida entre todos</strong> cuando fue la mitad del grupo.</li>
<li><strong>Hacer cuentas parciales en un papel</strong> y después contar esos gastos de nuevo al final.</li>
<li><strong>No acordar cómo se divide la nafta</strong> hasta que alguien pregunta en la ruta de vuelta.</li>
<li><strong>Dejar las cuentas para "cuando volvamos"</strong> y que pasen semanas.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Conviene alquilar por semana o por quincena?</h3>
<p>Depende de cuántos días puede cada uno. Si la mitad del grupo solo puede una semana, a veces conviene alquilar la quincena y que el resto se sume por tramos, dividiendo el alquiler por noches como en el ejemplo de arriba.</p>
<h3>¿Qué hacemos con la comida que sobra al final?</h3>
<p>Lo habitual es no recalcular nada: se reparte entre quienes se la quieran llevar. Recalcular por un paquete de fideos complica más de lo que ayuda.</p>
<h3>¿Y si alguien no tiene la app?</h3>
<p>Puede sumarse con el código del viaje sin crear una cuenta, o alguien del grupo anota sus gastos en su nombre.</p>
`,
  },
  {
    slug: "alternativa-a-splitwise",
    pair: "splitwise-alternative",
    published: "2026-10-29",
    title: "Alternativa a Splitwise para viajes en grupo: Splitwise, Tricount y TribuSplit comparados",
    desc: "Splitwise ahora limita cuántos gastos por día carga la versión gratis. Comparamos Splitwise, Tricount y TribuSplit para viajes en grupo: límites, monedas, cómo se liquida y cuándo conviene cada una.",
    lead: "Si buscás una alternativa a Splitwise es probable que te hayas topado con el límite de gastos por día de la versión gratis, justo en el viaje, cuando más gastos hay. Acá va una comparación honesta, incluida la app que hice yo.",
    related: ["como-dividir-gastos-de-un-viaje", "gastos-en-distintas-monedas", "minimizar-transferencias"],
    body: `
<h2>Antes de empezar: quién escribe esto</h2>
<p>Soy Valentin y hice %BRAND%, así que no soy neutral. Por eso esta comparación dice también dónde %BRAND% se queda corta y en qué casos te conviene otra app. Usé Splitwise en varios viajes antes de armar la mía, y la información sobre las otras apps sale de sus propias páginas de ayuda y tiendas, revisadas en octubre de 2026. Las condiciones cambian: si algo te resulta clave, confirmalo en la app antes de decidir.</p>

<h2>Por qué tanta gente busca una alternativa a Splitwise</h2>
<p>Splitwise es la app más conocida para dividir gastos y lo hace bien. El cambio que generó la mayoría de las búsquedas fue en su versión gratuita: ahora limita la cantidad de gastos nuevos que se pueden cargar por día. En sus respuestas de soporte, Splitwise habla de <strong>cuatro gastos nuevos por día</strong> en la versión gratis; para cargar sin límite hay que pagar Splitwise Pro.</p>
<p>Para una casa compartida, cuatro gastos por día alcanzan de sobra. En un viaje en grupo no: un solo día puede tener nafta, peaje, desayuno, súper, almuerzo, entradas y la cena. Si el límite es por persona, se puede repartir la carga entre varios del grupo, pero eso implica justamente lo que una app debería evitar: acordarse de anotar después.</p>
<p>La versión gratis de Splitwise también muestra publicidad, y la conversión automática entre monedas está entre las funciones de Pro. En la versión gratis se pueden cargar gastos en distintas monedas, pero los saldos quedan separados por moneda.</p>

<h2>Las tres opciones, en una tabla</h2>
<table>
<thead><tr><th></th><th>Splitwise (gratis)</th><th>Tricount</th><th>%BRAND%</th></tr></thead>
<tbody>
<tr><td>Precio</td><td>Gratis con límites; Pro pago</td><td>Gratis</td><td>Gratis, con publicidad</td></tr>
<tr><td>Gastos por día</td><td>Limitados (4 según su soporte)</td><td>Sin límite</td><td>Sin límite</td></tr>
<tr><td>Varias monedas</td><td>Sí; conversión automática solo en Pro</td><td>Sí</td><td>Sí, con cotización automática y editable</td></tr>
<tr><td>Dólar oficial, MEP, blue o tarjeta</td><td>No</td><td>No</td><td>Sí, al cargar el gasto y al repartir</td></tr>
<tr><td>División desigual (montos o porcentajes)</td><td>Sí</td><td>Sí</td><td>No: partes iguales entre quienes participan</td></tr>
<tr><td>Repartir a mitad del viaje</td><td>Se salda en cualquier momento</td><td>Se salda en cualquier momento</td><td>Repartidas parciales que cierran lo anterior</td></tr>
<tr><td>Confirmar pagos</td><td>Se registra el pago</td><td>Se registra el pago</td><td>"Ya pagué" y "Recibido", con alias para copiar</td></tr>
<tr><td>Sumarse sin cuenta</td><td>Cada uno necesita cuenta para ver el grupo</td><td>Sí, con link</td><td>Sí, con código o link</td></tr>
<tr><td>Fotos de tickets</td><td>Solo Pro</td><td>Sí</td><td>No</td></tr>
<tr><td>Dónde funciona</td><td>App iOS, Android y web</td><td>App iOS y Android</td><td>Web instalable en el celular</td></tr>
</tbody>
</table>
<p>Tricount hoy pertenece a bunq, un banco digital europeo. La app es gratis y se integra con una tarjeta de bunq que agrega los pagos solos al grupo. Según su centro de ayuda, con el cambio de app se quitaron algunas funciones de la versión anterior, como exportar a CSV o PDF y las estadísticas.</p>

<h2>Cuándo conviene cada una</h2>
<h3>Splitwise: si el grupo ya la usa o pagan Pro</h3>
<p>Si tu grupo ya tiene años de saldos en Splitwise, o lo usan para la casa todo el año, cambiar tiene costo. Con Pro desaparecen el límite diario y la publicidad, y suma conversión de monedas y escaneo de tickets. También es la mejor opción si necesitan divisiones desiguales complejas: por ítem, por porcentaje o por partes.</p>

<h3>Tricount: si viajan por Europa o quieren una app nativa gratis</h3>
<p>Tricount no tiene límite de gastos y la gente se suma con un link, sin cuenta. Si alguien del grupo usa bunq, la tarjeta integrada ahorra cargar gastos a mano. Para viajes por Europa, en euros, es una opción muy sólida.</p>

<h3>%BRAND%: si el viaje tiene muchos gastos por día, varias monedas o pesos argentinos</h3>
<p>Lo hice para los viajes que hacía con amigos: una casa en la costa entre seis u ocho, o una semana en Brasil, con diez gastos por día y alguien que a mitad del viaje dice "hagamos cuentas de lo que llevamos". Lo que resuelve mejor:</p>
<ul>
<li><strong>Sin límite de gastos</strong> y sin necesidad de que todos se creen una cuenta: alguien crea el viaje, comparte el código y cada uno elige su nombre.</li>
<li><strong>Repartidas parciales.</strong> "Repartir hasta hoy" calcula quién le paga a quién con lo cargado hasta ese momento, y los gastos que vengan después entran en la siguiente repartida o en la final.</li>
<li><strong>Monedas y dólar argentino.</strong> Un gasto en reales o en dólares se convierte a la moneda del viaje con la cotización del día, y la repartida se puede hacer en otra moneda (por ejemplo, el viaje en reales y los pagos entre ustedes en pesos), eligiendo dólar oficial, MEP, blue o tarjeta.</li>
<li><strong>Pocas transferencias y pagos confirmados.</strong> Calcula la menor cantidad de transferencias posible, muestra el alias de quien cobra para copiarlo, y el pago queda saldado cuando el que recibe confirma.</li>
</ul>
[[fig settle-fx | Repartida en otra moneda: la cotización se puede editar antes de confirmar]]
<p>Dónde se queda corta, para que lo sepas antes: no permite montos o porcentajes distintos por persona (sí elegir quién participa de cada gasto), no tiene fotos de tickets ni exportación, y es una web que se instala en el celular, no una app de las tiendas. Es gratis porque muestra publicidad, nunca dentro del formulario de gastos ni al lado de los botones de pago.</p>

<h2>Cómo pasarse a mitad de un viaje</h2>
<p>Si ya empezaron en Splitwise y se quedaron sin cargas, no hace falta copiar gasto por gasto:</p>
<ol>
<li>En Splitwise, miren el saldo actual de cada persona del grupo.</li>
<li>En la nueva app, creen el viaje y carguen un gasto por persona que represente su saldo previo, o directamente salden lo que había y arranquen de cero.</li>
<li>De ahí en adelante, carguen todo en un solo lugar. Lo peor es tener la mitad en una app y la mitad en otra.</li>
</ol>
<p>Lo más prolijo, si se puede, es saldar todo lo anterior antes de cambiar. Así nadie arrastra cuentas de una app a otra.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuántos gastos por día permite Splitwise gratis?</h3>
<p>Splitwise habla de cuatro gastos nuevos por día en la versión gratuita, en sus respuestas de soporte. El límite se renueva al día siguiente. Con Splitwise Pro no hay límite.</p>
<h3>¿Hay alguna alternativa a Splitwise completamente gratis?</h3>
<p>Sí. Tricount es gratis y %BRAND% también (con publicidad). Las dos permiten gastos ilimitados y sumar gente sin que se cree una cuenta.</p>
<h3>¿Cuál conviene para un viaje a Brasil desde Argentina?</h3>
<p>Si quieren cargar en reales y pagarse entre ustedes en pesos con el dólar que usaron de verdad (tarjeta, MEP o blue), %BRAND% está pensada para eso. Lo explicamos en detalle en la guía sobre <a href="/guias/pagar-en-brasil-pix-tarjeta-efectivo/">cómo pagar en Brasil</a>.</p>
<h3>¿Puedo usar %BRAND% para gastos fuera de un viaje?</h3>
<p>Sí: una casa compartida o una salida funcionan igual, como un "viaje" con su grupo. Pero está pensada para viajes; para gastos de la casa todo el año, Splitwise sigue siendo muy cómodo.</p>
<p class="meta">Splitwise y Tricount son marcas de sus respectivos dueños. %BRAND% no está afiliada a ninguna de las dos. Información revisada en octubre de 2026.</p>
`,
  },
];
