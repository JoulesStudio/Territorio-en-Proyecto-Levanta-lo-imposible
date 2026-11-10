import React, { useEffect, useRef, useState } from 'react';
import {
  GraduationCap,
  FlaskConical,
  Compass,
  Building,
  HardHat,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const AnahuacSection: React.FC = () => {
  const officialCourses = [
    {
      code: 'Semestre 2',
      name: 'Topografía',
      area: 'Vías de Comunicación',
      desc: 'Mide distancias, ángulos y desniveles para representar un terreno.',
    },
    {
      code: 'Semestre 3',
      name: 'Laboratorio de materiales I',
      area: 'Construcción',
      desc: 'Explora cómo se ponen a prueba los materiales de construcción.',
    },
    {
      code: 'Semestre 4',
      name: 'Geotecnia',
      area: 'Geotecnia',
      desc: 'Estudia cómo se comporta el suelo cuando recibe peso.',
    },
    {
      code: 'Semestre 5',
      name: 'Mecánica de fluidos',
      area: 'Hidráulica',
      desc: 'Entiende cómo se mueven el agua y otros fluidos y qué fuerzas ejercen.',
    },
    {
      code: 'Semestre 6',
      name: 'Diseño estructural',
      area: 'Estructuras',
      desc: 'Aplica principios de física y mecánica a elementos que sostienen una construcción.',
    },
  ];

  return (
    <section id="anahuac" className="py-16 bg-white border-b border-[#191716]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono-tech text-xs tracking-wider uppercase text-[#FF5900] font-bold">
              04 · EN UNIVERSIDAD ANÁHUAC MÉXICO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191716] tracking-tight">
              Ingeniería Civil · Campus Norte
            </h2>
            <p className="text-sm sm:text-base text-[#191716]/75">
              Formación técnica rigurosa complementada con laboratorios especializados, prácticas de campo y una
              visión empresarial orientada al liderazgo y la responsabilidad social.
            </p>
          </div>

          <div className="shrink-0 p-4 rounded-xl bg-[#FAF8F3] border border-[#191716]/10 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-[#FF5900]/10 text-[#FF5900]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-base text-[#191716]">9 Semestres</div>
              <div className="font-mono-tech text-[11px] text-[#191716]/60">Licenciatura Presencial</div>
            </div>
          </div>
        </div>

        {/* Pilares Institucionales Oficiales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#191716]">
              Laboratorios de Materiales y Fluidos
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75 leading-relaxed">
              El programa incluye prácticas en laboratorios de materiales, geotecnia, mecánica de fluidos y canales y tuberías.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
              <HardHat className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#191716]">
              Visitas a Obra y Práctica de Campo
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75 leading-relaxed">
              El programa describe visitas a obra desde los primeros semestres para conocer cómo se ejecutan los proyectos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#191716]/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#191716]/10 flex items-center justify-center text-[#FF5900]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-[#191716]">
              Enfoque Empresarial y Ético
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75 leading-relaxed">
              El plan combina formación en emprendimiento, ingeniería financiera, dirección de empresas, ética y gerencia de proyectos.
            </p>
          </div>
        </div>

        {/* Materias Clave del Plan Oficial de Estudios */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#191716]">
              Ejemplos representativos de materias troncales
            </h3>
            <span className="font-mono-tech text-xs text-[#191716]/50 hidden sm:inline">
              Plan oficial de 9 semestres
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialCourses.map((c) => (
              <div
                key={c.code}
                className="p-4 rounded-xl bg-white border border-[#191716]/10 hover:border-[#FF5900]/50 transition-colors space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tech font-bold text-[#FF5900]">{c.code}</span>
                  <span className="text-[#191716]/60 font-medium">{c.area}</span>
                </div>
                <h4 className="font-bold text-sm text-[#191716]">{c.name}</h4>
                <p className="text-xs text-[#191716]/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#191716]/55 italic pt-1">
            * Nota: Los ejemplos laborales y de proyección presentados en este prototipo son casos ilustrativos con fines
            de orientación vocacional y deben diferenciarse del mapa curricular oficial.
          </p>
        </div>

        {/* CTA Institucional Directo */}
        <div className="p-8 rounded-2xl bg-[#FAF8F3] border-2 border-[#191716]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-[#191716]">
              ¿Te interesa conocer las instalaciones y el plan de estudios completo?
            </h3>
            <p className="text-xs sm:text-sm text-[#191716]/75">
              En la página oficial encontrarás el plan completo y los datos de contacto del equipo de Promoción de Campus Norte.
            </p>
          </div>

          <a
            href="https://mexico.anahuac.mx/licenciaturas/ingenieria-civil"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#FF5900] text-[#191716] hover:bg-[#E04E00] rounded-xl shadow-xs transition-colors shrink-0 min-h-[48px]"
          >
            <span>Conocer el plan y contactar a Promoción Campus Norte</span>
            <ExternalLink className="w-4 h-4 text-[#191716]" />
          </a>
        </div>
      </div>
    </section>
  );
};

const PROGRAM = 'https://mexico.anahuac.mx/licenciaturas/ingenieria-civil';
const PRACTICES = 'https://empleabilidad.anahuac.mx/page/practicas';
const EMPLOYMENT = 'https://empleabilidad.anahuac.mx/misc/servicios';
const APPOINTMENT = 'https://mexico.anahuac.mx/licenciaturas/agenda-tu-cita-online';
const CAMPUS_CONTACT = 'https://mexico.anahuac.mx/licenciaturas/campus-norte-anahuac-mexico';
const CONTACT_NOTICE = 'https://www.anahuac.mx/mexico/proteccion-de-datos-personales/AvisosdePrivacidad/ContactoAPREU';
const PRIVACY_PORTAL = 'https://www.anahuac.mx/mexico/proteccion-de-datos-personales/taxonomy/term/34';
const COORDINATION = 'mailto:joseph.guevarafl@anahuac.mx?subject=Consulta%20sobre%20Ingenier%C3%ADa%20Civil%20%C2%B7%20Campus%20Norte';

const careerPage = 'mx-auto max-w-7xl px-4 sm:px-7 lg:px-8';
const careerMono = 'font-mono-tech text-[11px] font-bold uppercase tracking-[0.14em]';
const careerButton = 'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#2A1F18] bg-[#FF681E] px-4 py-2.5 text-sm font-extrabold text-[#201914] hover:bg-[#FF925E] focus-visible:outline-2 focus-visible:outline-offset-2';
const careerLink = 'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-[#733C21] underline decoration-[#A76F4D] underline-offset-4 hover:text-[#4A2B1B]';

const MYTHS = [
  { category: 'DÓNDE TRABAJAS', quote: 'Todo el trabajo de Ingeniería Civil es en obra.', truth: false,
    title: 'Un proyecto también pasa por oficina, campo y laboratorio.',
    detail: 'En una planta industrial, una persona toma muestras del piso, otra analiza las cargas y otra coordina la reparación. Según el puesto, puedes medir en campo, modelar desde oficina, ensayar materiales en laboratorio o supervisar la obra.',
    action: 'Prueba la misión de la planta', href: '#zona/planta-industrial', source: PROGRAM },
  { category: 'QUÉ DISEÑAS', quote: 'Diseñar también es parte de Ingeniería Civil.', truth: true,
    title: 'La ingeniería civil diseña sistemas que sostienen y conectan.',
    detail: 'En una estación, Arquitectura estudia cómo se usan los espacios y Civil analiza apoyos, cargas, pavimento y drenaje. Ambas disciplinas toman decisiones de diseño y coordinan cómo se construye, se usa y se mantiene la estación.',
    action: 'Compara ambos roles', href: '#mision-equipo', source: PROGRAM },
  { category: 'PRIMER EMPLEO', quote: 'Todas las vacantes se llaman “Ingeniero civil”.', truth: false,
    title: 'Busca por lo que quieres hacer.',
    detail: 'Prueba búsquedas como “auxiliar de costos”, “modelador BIM junior”, “auxiliar de laboratorio de materiales” o “proyectista hidráulico junior”. Lee las tareas y los requisitos. Puestos con títulos parecidos pueden pedir experiencias distintas.',
    action: 'Explora las fichas de las áreas', href: '#explorar', source: EMPLOYMENT },
  { category: 'QUÉ HACES', quote: 'El trabajo de Civil puede empezar mucho después de la inauguración.', truth: true,
    title: 'Mantener infraestructura también es ingeniería.',
    detail: 'Una carretera, un puente o una red de agua necesita inspecciones y mantenimiento. Un equipo civil puede detectar daños, medir cómo funciona una obra y decidir dónde intervenir primero.',
    action: 'Recorre la red de agua rural', href: '#zona/agua-rural', source: PROGRAM },
  { category: 'MIEDO A LAS MATEMÁTICAS', quote: 'Si las matemáticas me cuestan hoy, ya no puedo considerar esta carrera.', truth: false,
    title: 'La física y las matemáticas se aprenden practicando.',
    detail: 'La carrera sí exige trabajar con cálculo y física. En una red de agua puedes empezar con una pregunta concreta: si entran seis litros por segundo y llegan cuatro, ¿qué revisarías? Resolver problemas así ayuda a darle sentido a lo que estudias.',
    action: 'Prueba un reto en dos niveles', href: '#zona/agua-rural', source: PROGRAM },
  { category: 'RUTA LABORAL', quote: 'El título por sí solo garantiza un empleo.', truth: false,
    title: 'Tu primer empleo se prepara y se busca.',
    detail: 'Durante la carrera puedes explorar prácticas supervisadas y guardar ejemplos de cómo resolviste un problema. Al postularte, adapta tu CV a las tareas de la vacante y describe con claridad tu aportación al proyecto.',
    action: 'Conoce las prácticas de Anáhuac', href: PRACTICES, source: EMPLOYMENT },
  { category: 'TRABAJO EN EQUIPO', quote: 'En un parque eólico, Civil colabora con especialistas de otras áreas.', truth: true,
    title: 'El equipo civil hace posible parte de la infraestructura.',
    detail: 'Civil puede estudiar el suelo, diseñar apoyos y preparar accesos. Otros especialistas trabajan con la turbina, la generación eléctrica y la conexión a la red. El reparto de responsabilidades cambia según el proyecto.',
    action: 'Entra al parque eólico', href: '#zona/parque-eolico', source: PROGRAM },
  { category: 'SECTORES', quote: 'La única salida al egresar es una constructora.', truth: false,
    title: 'También puedes explorar agua, transporte, industria y consultoría.',
    detail: 'Imagina diagnosticar fugas en un organismo de agua, revisar un patio de carga o planear el mantenimiento en una planta. Los puestos dependen del sector, del lugar y de las competencias que desarrolles.',
    action: 'Explora los cuatro territorios', href: '#mapa', source: PROGRAM },
] as const;

function CareerHero({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <div className="border-b-4 border-[#FF681E] bg-[#201914] text-[#FFF3DF]"
    style={{backgroundImage:'linear-gradient(#3D2D23 1px,transparent 1px),linear-gradient(90deg,#3D2D23 1px,transparent 1px)',backgroundSize:'28px 28px'}}>
    <div className={careerPage + ' py-6 sm:py-8'}>
      <p className={careerMono + ' mb-2 text-[#FFB487]'}>{label}</p>
      <h1 className="max-w-[21ch] text-[clamp(2.2rem,5.4vw,4.25rem)] font-black leading-[.98] tracking-[-.055em]">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#F5DBCA] sm:text-base">{copy}</p>
    </div>
  </div>;
}

export function MythsSection() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const myth = MYTHS[index];
  const seen = finished ? MYTHS.length : index + Number(choice !== null);

  function nextCard() {
    if (index === MYTHS.length - 1) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setChoice(null);
    }
    requestAnimationFrame(() => heading.current?.focus({preventScroll:true}));
  }

  function playAgain() {
    setIndex(0);
    setChoice(null);
    setFinished(false);
    requestAnimationFrame(() => heading.current?.focus({preventScroll:true}));
  }

  return <section className="bg-[#EEE6D9]">
    <CareerHero label="Territorio en Proyecto / Orientación vocacional" title="¿Mito o verdad?" copy="Pon a prueba lo que has escuchado. Descubre qué hacen las y los ingenieros civiles y cómo buscan sus primeras oportunidades." />
    <div className={careerPage + ' grid gap-4 py-5 sm:py-7 lg:grid-cols-[1.65fr_1fr]'}>
      <article className="min-w-0 overflow-hidden rounded-xl border border-[#B99B82] bg-[#FFF8EE] shadow-[3px_3px_0_#D0B8A1]">
        <div className="flex items-center justify-between gap-2 border-b border-[#CCB19B] bg-[#F5E4D2] px-4 py-2.5">
          <p className={careerMono + ' text-[#743A1F]'}>{finished ? 'Reto terminado' : myth.category}</p>
          <p className={careerMono + ' shrink-0 text-[#583D2D]'} aria-live="polite">{seen}/{MYTHS.length} revisadas</p>
        </div>
        <div className="p-4 sm:p-6">
          <h2 ref={heading} tabIndex={-1} className="text-[clamp(1.55rem,3.6vw,2.5rem)] font-black leading-tight tracking-tight">{finished ? 'Ya puedes mirar la carrera con otros ojos.' : myth.quote}</h2>
          {finished ? (
            <div className="mt-3">
              <p className="max-w-xl text-sm leading-relaxed">Elige una actividad que te haya llamado la atención. Pruébala en el atlas o pregunta en Campus Norte cómo se aprende.</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2"><a href="#mapa" className={careerButton}>Ir al atlas <ArrowRight size={16} aria-hidden="true"/></a><button type="button" onClick={playAgain} className={careerLink}>Volver a jugar</button></div>
            </div>
          ) : (
            <>
              <div role="group" aria-label="Elige mito o verdad" className="mt-4 flex flex-wrap gap-2">
                {([false,true] as const).map(value => <button key={String(value)} type="button" aria-pressed={choice===value} disabled={choice!==null} onClick={()=>setChoice(value)}
                  className={`min-h-[46px] min-w-[112px] rounded-lg border px-4 font-extrabold ${choice===value?'border-[#40261A] bg-[#302118] text-[#FFF4E2]':'border-[#B99B82] bg-white text-[#542E1C] hover:bg-[#F8DFCA]'}`}>{value?'Verdad':'Mito'}</button>)}
              </div>
              {choice!==null && <div className="mt-4 rounded-lg border border-[#9BB299] bg-[#E6EDDD] p-3.5 text-[#1F3D31]">
                <div role="status"><p className={careerMono}>{choice===myth.truth?'Acertaste':'Mira el contexto'} · {myth.truth?'Verdad':'Mito'}</p>
                <h3 className="mt-1 text-lg font-extrabold">{myth.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{myth.detail}</p></div>
                <div className="mt-2 flex flex-wrap gap-x-4"><a className={careerLink} href={myth.href} target={myth.href.startsWith('https:') ? '_blank' : undefined} rel={myth.href.startsWith('https:') ? 'noreferrer' : undefined}>{myth.action} <ArrowRight size={15} aria-hidden="true"/></a><a className={careerLink} href={myth.source} target="_blank" rel="noreferrer">Fuente <ExternalLink size={14} aria-hidden="true"/></a></div>
              </div>}
              {choice!==null && <button type="button" className={careerButton+' mt-4'} onClick={nextCard}>{index===MYTHS.length-1?'Terminar reto':'Siguiente tarjeta'} <ArrowRight size={16} aria-hidden="true"/></button>}
            </>
          )}
        </div>
      </article>
      <aside className="rounded-xl border border-[#B79D87] bg-[#FAF1E3] p-4 sm:p-5">
        <p className={careerMono+' text-[#743A1F]'}>Del salón al trabajo</p>
        <h2 className="mt-1 text-xl font-black">¿Por dónde empiezo?</h2>
        <ol className="mt-3 grid gap-3 text-sm leading-relaxed">
          <li><strong>01 · Explora una tarea.</strong> Compara qué te gusta más: medir, modelar, coordinar una obra o revisar materiales.</li>
          <li><strong>02 · Hazla en un proyecto.</strong> Cuenta qué problema encontraste, qué propusiste y qué aprendiste. Eso da contexto a tu CV.</li>
          <li><strong>03 · Busca por funciones.</strong> Revisa prácticas o puestos de entrada y lee qué harías en un día real.</li>
        </ol>
        <a href={EMPLOYMENT} target="_blank" rel="noreferrer" className={careerLink+' mt-2'}>Empleabilidad Anáhuac <ExternalLink size={14} aria-hidden="true"/></a>
        <a href="#conecta" className={careerButton+' mt-2 w-full'}>Preguntar a Anáhuac <ArrowRight size={16} aria-hidden="true"/></a>
      </aside>
    </div>
  </section>;
}

type ContactRole = 'adult' | 'minor' | 'guardian';
type ContactLink = { formUrl: string; noticeUrl: string };

export function ContactSection() {
  const [role, setRole] = useState<ContactRole | null>(null);
  const [institutional, setInstitutional] = useState<ContactLink | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contacto-config', {signal:controller.signal})
      .then(response => response.ok ? response.json() : null)
      .then(value => {
        if (typeof value?.formUrl === 'string' && typeof value?.noticeUrl === 'string') setInstitutional(value);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return <section className="bg-[#EEE6D9]">
    <CareerHero label="Campus Norte / Ingeniería Civil" title="Conecta con Anáhuac." copy="Recibe información de la carrera, pregunta por visitas o actividades, o lleva tus dudas a la coordinación académica." />
    <div className={careerPage+' grid gap-4 py-5 sm:py-7 lg:grid-cols-[1.5fr_1fr]'}>
      <article className="rounded-xl border border-[#B99B82] bg-[#FFF8EE] p-4 shadow-[3px_3px_0_#D0B8A1] sm:p-6">
        <p className={careerMono+' text-[#743A1F]'}>Solicitud voluntaria</p>
        <h2 className="mt-1 text-2xl font-black">¿Quién solicita información?</h2>
        <div role="group" aria-label="Quién solicita información" className="mt-3 grid gap-2 sm:grid-cols-3">
          {([
            ['adult','Tengo 18 años o más'],
            ['minor','Soy menor de 18'],
            ['guardian','Soy madre, padre o tutor'],
          ] as const).map(([id,label])=><button type="button" key={id} aria-pressed={role===id} onClick={()=>setRole(id)}
            className={`min-h-[48px] rounded-lg border px-3 py-2 text-left text-sm font-bold ${role===id?'border-[#39291E] bg-[#302118] text-[#FFF4E2]':'border-[#B99B82] bg-white text-[#542E1C] hover:bg-[#F8DFCA]'}`}>{label}</button>)}
        </div>
        <div className="mt-4 text-sm leading-relaxed" aria-live="polite">
          {role===null && <p>Elige una opción para ver el paso que te corresponde.</p>}
          {role==='minor' && <div className="rounded-lg border border-[#C6A88A] bg-[#F5E5D2] p-3.5">
            <p>Pide a tu madre, padre o representante legal que haga la solicitud contigo. Podrá usar su propio correo para recibir información y avisos.</p>
            <button type="button" onClick={()=>setRole('guardian')} className={careerLink+' mt-1'}>Continuar con mi madre, padre o tutor</button>
          </div>}
          {(role==='adult'||role==='guardian') && <div className="rounded-lg border border-[#C6A88A] bg-[#F5E5D2] p-3.5">
            <p>{role==='adult'?'Usa tu propio correo si quieres que el equipo de Anáhuac te contacte.':'Usa tu correo como madre, padre o representante legal. La Universidad te indicará cómo dar el consentimiento que corresponda.'}</p>
            <a href={institutional?.formUrl ?? CAMPUS_CONTACT} target="_blank" rel="noreferrer" className={careerButton+' mt-3'}>{institutional?'Abrir formulario institucional':'Solicitar informes en Campus Norte'} <ExternalLink size={16} aria-hidden="true"/></a>
            <p className="mt-2 text-xs text-[#5C4637]">{institutional?'El registro abre en el formulario institucional. Lee su aviso antes de enviar.':'Se abre el sitio oficial de Campus Norte. Elige Ingeniería Civil en el formulario de informes.'}</p>
          </div>}
        </div>
        <div className="mt-4 border-t border-[#D4BAA4] pt-2">
          <p className="text-sm font-semibold">Tus datos se comparten desde el formulario institucional que elijas. El juego no recibe esos registros.</p>
          <a href="#privacidad" className={careerLink}>Cómo se usan tus datos <ArrowRight size={15} aria-hidden="true"/></a>
          {institutional && <a href={institutional.noticeUrl} target="_blank" rel="noreferrer" className={careerLink+' ml-3'}>Aviso del formulario <ExternalLink size={15} aria-hidden="true"/></a>}
        </div>
      </article>
      <aside className="grid content-start gap-3">
        <div className="rounded-xl border border-[#B79D87] bg-[#FAF1E3] p-4">
          <p className={careerMono+' text-[#743A1F]'}>Conoce el campus</p><h2 className="mt-1 text-xl font-black">Agenda una cita informativa.</h2>
          <p className="mt-2 text-sm leading-relaxed">Pregunta por recorridos, laboratorios y actividades para aspirantes según disponibilidad. Selecciona Campus Norte.</p>
          {role!=='minor' && <a href={APPOINTMENT} target="_blank" rel="noreferrer" className={careerLink}>Ver citas de informes <ExternalLink size={15} aria-hidden="true"/></a>}
        </div>
        <div className="rounded-xl border border-[#B79D87] bg-[#FAF1E3] p-4">
          <p className={careerMono+' text-[#743A1F]'}>Habla con coordinación</p><h2 className="mt-1 text-xl font-black">Lleva tu pregunta.</h2>
          <p className="mt-2 text-sm leading-relaxed">Puedes consultar el plan de estudios o escribir al Mtro. Joseph Guevara, coordinador académico de Ingeniería Civil en Campus Norte.</p>
          {role!=='minor' && <a href={COORDINATION} className={careerLink}>Escribir a coordinación <ArrowRight size={15} aria-hidden="true"/></a>}
          <a href={PROGRAM} target="_blank" rel="noreferrer" className={careerLink+' ml-3'}>Ficha oficial <ExternalLink size={15} aria-hidden="true"/></a>
        </div>
      </aside>
    </div>
  </section>;
}

export function PrivacySection() {
  return <section className="bg-[#EEE6D9]">
    <CareerHero label="Territorio en Proyecto / Privacidad" title="Tus datos y tu decisión." copy="El atlas, las misiones y el juego de mitos se pueden usar sin registro. Solicitar contacto es una decisión aparte." />
    <div className={careerPage+' grid gap-3 py-5 sm:grid-cols-2 sm:py-7'}>
      <article className="rounded-xl border border-[#B99B82] bg-[#FFF8EE] p-4">
        <h2 className="text-xl font-black">Dentro de la app</h2><p className="mt-2 text-sm leading-relaxed">El juego guarda el avance y el nivel durante la sesión en tu navegador. La guía envía el tema seleccionado y el nivel si está conectada. El registro de orientación abre en otro sitio y no se vincula con tus respuestas del juego.</p>
      </article>
      <article className="rounded-xl border border-[#B99B82] bg-[#FFF8EE] p-4">
        <h2 className="text-xl font-black">Al solicitar informes</h2><p className="mt-2 text-sm leading-relaxed">La Universidad Anáhuac México, operada por Investigaciones y Estudios Superiores, S.C., dispone de canales institucionales de atención preuniversitaria. Antes de enviar, revisa el aviso que acompaña al formulario que uses, sus campos y los permisos que aceptas.</p>
        <a href={CONTACT_NOTICE} target="_blank" rel="noreferrer" className={careerLink}>Aviso de contacto preuniversitario <ExternalLink size={15} aria-hidden="true"/></a>
      </article>
      <article className="rounded-xl border border-[#B99B82] bg-[#FFF8EE] p-4">
        <h2 className="text-xl font-black">Si eres menor de edad</h2><p className="mt-2 text-sm leading-relaxed">Puedes jugar por tu cuenta. Para compartir datos y solicitar seguimiento, pide a tu madre, padre o representante legal que continúe contigo. Puede usar su propio correo.</p>
      </article>
      <article className="rounded-xl border border-[#B99B82] bg-[#FFF8EE] p-4">
        <h2 className="text-xl font-black">Si cambias de opinión</h2><p className="mt-2 text-sm leading-relaxed">Consulta cómo retirar tu consentimiento, dejar de recibir comunicaciones o solicitar acceso, corrección, cancelación u oposición al uso de tus datos.</p>
        <a href={PRIVACY_PORTAL} target="_blank" rel="noreferrer" className={careerLink}>Procedimientos de privacidad de Anáhuac <ExternalLink size={15} aria-hidden="true"/></a>
      </article>
    </div>
  </section>;
}
