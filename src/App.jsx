import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, Menu, MoveRight, X } from 'lucide-react'

const art = {
  chrome: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1800&q=88',
  banner: './banner.png',
  form: 'https://images.unsplash.com/photo-1635776062043-223faf322554?auto=format&fit=crop&w=1600&q=88',
  glass: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=1500&q=88',
  fluid: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1500&q=88',
  experiment1: './cycle.png',
  experiment2: './headphones.png',
  partnerLogo: '/landing-logo-v2-54d421b5.png',
  orange: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1500&q=88',
}

const stats = [
  ['2025', 'Founded'],
  ['200+', 'Projects shipped'],
  ['16', 'Team members'],
  ['5+', 'Industries served'],
]

const faqs = [
  ['What kind of 3D work do you create?', 'We create product visualizations, motion design, environments, brand films, and production-ready 3D assets for digital experiences.'],
  ['Can you work with an existing creative team?', 'Absolutely. We regularly plug into in-house, agency, and production teams as a focused 3D partner.'],
  ['How long does a typical project take?', 'Most engagements run between two and eight weeks. After a short discovery call, we share a clear scope, timeline, and production plan.'],
  ['Do you offer training as well as production?', 'Yes. Visual3D Academy is our learning platform for artists and teams who want to build practical, production-ready Blender skills.'],
]

const tools = [
  { name: 'Blender', logo: '/tools/blender.svg' },
  { name: 'Cinema 4D', logo: '/tools/cinema4d.svg', mono: true },
  { name: 'Unreal Engine', logo: '/tools/unrealengine.svg', mono: true },
  { name: 'Maya', logo: '/tools/autodeskmaya.svg' },
  { name: 'Houdini', logo: '/tools/houdini.svg' },
  { name: 'Substance', logo: '/tools/substance.svg' },
  { name: 'After Effects', logo: '/tools/aftereffects.svg' },
  { name: 'Octane', logo: '/tools/octanerender.svg', mono: true },
  { name: 'Redshift', logo: '/tools/redshift.svg' },
  { name: 'DaVinci', logo: '/tools/davinciresolve.svg', mono: true },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const cursorFollow = { stiffness: 1800, damping: 32, mass: .14, restDelta: .001 }

function Cursor() {
  const [variant, setVariant] = useState('default')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, cursorFollow)
  const smoothY = useSpring(y, cursorFollow)
  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const next = e.target.closest('[data-cursor="view"]') ? 'view'
        : e.target.closest('a, button, input, textarea, select') ? 'link'
          : 'default'
      setVariant((current) => (current === next ? current : next))
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [x, y])
  return (
    <motion.div className={`cursor cursor-${variant}`} style={{ x: smoothX, y: smoothY }}>
      <span>View project</span>
    </motion.div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <Link className="logo" to="/" aria-label="Syed Uzair home">
        <span className="logo-mark">S</span><span>SYED UZAIR</span>
      </Link>
      <nav className={open ? 'nav open' : 'nav'} onClick={() => setOpen(false)}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <a href="/#work">Work</a>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </header>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .18 }}
      transition={{ duration: .75, delay, ease: [.16, 1, .3, 1] }}
    >{children}</motion.div>
  )
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>
}

function Button({ to, children, light = false }) {
  return <Link className={`button ${light ? 'button-light' : ''}`} to={to}>{children}<MoveRight size={19} /></Link>
}

function ClientStrip() {
  return (
    <section className="clients">
      <p>Trusted by ambitious teams and creative studios</p>
      <div className="client-row">
        {['VØXEL', 'NORTH™', 'ORBIT', 'MONO', 'KITE', 'FORM'].map((name) => <span key={name}>{name}</span>)}
      </div>
    </section>
  )
}

function Partner() {
  const logoMask = { WebkitMaskImage: `url(${art.partnerLogo})`, maskImage: `url(${art.partnerLogo})` }
  return (
    <section className="partner">
      <Reveal className="partner-inner">
        <Eyebrow>Official partner of</Eyebrow>
        <div className="partner-stage">
          <img className="partner-logo" src={art.partnerLogo} alt="Visual3D Academy" />
          <div className="partner-shine" style={logoMask} aria-hidden="true" />
          <img className="partner-reflection" src={art.partnerLogo} alt="" aria-hidden="true" />
        </div>
        <p>The studio behind Visual3D Academy, a Blender learning platform built by the same artists who craft our client work.</p>
      </Reveal>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats">
      {stats.map(([number, label], index) => (
        <Reveal className="stat" delay={index * .06} key={label}>
          <strong>{number}</strong><span>{label}</span>
        </Reveal>
      ))}
    </section>
  )
}

function Tools() {
  return (
    <section className="section tools-section">
      <Reveal className="section-heading centered">
        <Eyebrow>Creative ecosystem</Eyebrow>
        <h2>Works with your <i>software.</i></h2>
        <p>Our artists move fluently across the tools your pipeline already relies on.</p>
      </Reveal>
      <div className="tool-grid">
        {tools.map((tool, i) => (
          <Reveal className="tool" delay={(i % 5) * .05} key={tool.name}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <img className={tool.mono ? 'tool-logo mono' : 'tool-logo'} src={tool.logo} alt="" />
            {tool.name}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const [active, setActive] = useState(0)
  return (
    <section className="section faq-section">
      <Reveal className="faq-title">
        <Eyebrow>Questions, answered</Eyebrow>
        <h2>Good to know.</h2>
        <p>Everything you need before we begin.</p>
      </Reveal>
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className={`faq-item ${active === i ? 'active' : ''}`} key={q}>
            <button onClick={() => setActive(active === i ? -1 : i)}><span>{String(i + 1).padStart(2, '0')}</span>{q}<ChevronDown /></button>
            <AnimatePresence initial={false}>
              {active === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{a}</motion.p>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="cta">
      <div className="cta-orb" />
      <Reveal>
        <Eyebrow>Have a project in mind?</Eyebrow>
        <h2>Let’s make something<br /><i>impossible to ignore.</i></h2>
        <Button to="/contact" light>Start a conversation</Button>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div><Link className="logo" to="/"><span className="logo-mark">S</span><span>SYED UZAIR</span></Link><p>A 3D design studio turning ambitious ideas into images, motion, and digital experiences.</p></div>
        <div><small>Explore</small><Link to="/">Home</Link><Link to="/about">About</Link><a href="/#work">Selected work</a><Link to="/contact">Contact</Link></div>
        <div><small>Social</small><a href="https://www.instagram.com/" target="_blank">Instagram</a><a href="https://www.behance.net/" target="_blank">Behance</a><a href="https://www.linkedin.com/" target="_blank">LinkedIn</a></div>
        <div><small>Say hello</small><a href="mailto:hello@syeduzair.studio">hello@syeduzair.studio</a><p>Available worldwide</p></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Syed Uzair Studio</span><span>Crafted with curiosity</span></div>
    </footer>
  )
}

function ProjectVisual({ project }) {
  const frame = useRef(null)
  const [loadVideo, setLoadVideo] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!project.video || !frame.current) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setLoadVideo(true)
      observer.disconnect()
    }, { rootMargin: '240px' })
    observer.observe(frame.current)
    return () => observer.disconnect()
  }, [project.video])

  return (
    <div className={`project-image${playing ? ' is-playing' : ''}`} data-cursor="view" ref={frame}>
      <img src={project.image} alt={`${project.title} artwork`} />
      {project.video && loadVideo && (
        <video
          src={project.video}
          poster={project.image}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  )
}

function Home() {
  const projects = [
    { title: 'Motion Simulation', type: '', image: art.chrome, video: './web_promo.mp4', className: 'wide' },
    { title: '3D Modeling', type: '', image: art.experiment1 },
    { title: 'Product renders', type: '', image: art.experiment2 },
  ]
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <Reveal><Eyebrow>Independent 3D studio · Worldwide</Eyebrow></Reveal>
          <motion.h1 initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [.16, 1, .3, 1] }}>
            We make ideas<br />feel <i>tangible.</i>
          </motion.h1>
          <Reveal delay={.15} className="hero-bottom">
            <p>We build vivid 3D worlds, product visuals, and motion that give ambitious brands a dimension of their own.</p>
            <div className="scroll-cue"><span />Scroll</div>
          </Reveal>
        </div>
        <motion.div className="hero-art" initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }}>
          <img src={art.banner} alt="Abstract iridescent 3D form" />
          <span className="art-label">Selected work / 2026</span>
          <div className="orbit">SU</div>
        </motion.div>
      </section>
      {/* <ClientStrip /> */}
      <Partner />

      <section className="section intro">
        <Reveal><Eyebrow>What we do</Eyebrow></Reveal>
        <Reveal className="intro-copy">
          <h2>Built for the space between<br /><i>imagination and reality.</i></h2>
          <div><p>Syed Uzair is a multidisciplinary 3D studio and creative partner. We bring together artists, animators, and technical minds to create work that is beautiful, useful, and built to move.</p></div>
        </Reveal>
      </section>

      <section className="section work" id="work">
        <Reveal className="work-head"><div><Eyebrow>Selected work</Eyebrow><h2>Recent <i>experiments.</i></h2></div><p>Crafted frame by frame, pixel by pixel.</p></Reveal>
        <div className="project-grid">
          {projects.map((project, i) => (
            <Reveal className={`project ${project.className || ''}`} delay={i * .08} key={project.title}>
              <ProjectVisual project={project} />
              <div className="project-meta"><h3>{project.title}</h3><p>{project.type}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />
      <Tools />
      <CTA />
      <FAQ />
    </main>
  )
}

function About() {
  const team = [
    ['Syed Uzair', 'Founder · Creative Director', art.orange],
    ['Shadab', 'Lead Animator', art.fluid],
    ['Anshara', 'Technical Artist', art.glass],
    ['Teknotize', 'Development · Cloud', art.form],
  ]
  return (
    <main>
      <section className="page-hero">
        <Reveal><Eyebrow>About the studio</Eyebrow></Reveal>
        <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}>Small team.<br /><i>Big dimensions.</i></motion.h1>
        <Reveal className="page-hero-note"><span>( Our story )</span><p>We are a close-knit studio that believes the best digital work still begins with human curiosity.</p></Reveal>
      </section>
      <section className="about-image"><img src={art.form} alt="Abstract dimensional artwork" /><span>Independent since 2018</span></section>
      <Stats />

      <section className="section story">
        <Reveal><Eyebrow>Our story</Eyebrow></Reveal>
        <Reveal className="story-copy">
          <h2>It started with Blender,<br />curiosity, and <i>a blank canvas.</i></h2>
          <div><p>What began as one artist exploring the possibilities of 3D has grown into a collaborative studio working across visualization, animation, education, and technology.</p><p>Today, we partner with brands and creative teams to make visual ideas more expressive—and share what we learn through Visual3D Academy.</p></div>
        </Reveal>
      </section>

      <section className="section team">
        <Reveal className="team-head"><div><Eyebrow>The people</Eyebrow><h2>Meet the <i>team.</i></h2></div><p>A small, distributed group of specialists who care deeply about their craft.</p></Reveal>
        <div className="team-grid">
          {team.map(([name, role, image], i) => (
            <Reveal className="team-card" delay={i * .08} key={name}>
              <div className="team-image"><img src={image} alt="" /></div><h3>{name}</h3><p>{role}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Tools />
      <CTA />
    </main>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); setSent(true) }
  return (
    <main>
      <section className="contact-hero">
        <Reveal className="contact-copy">
          <Eyebrow>Contact</Eyebrow>
          <h1>Every project starts<br />with a <i>conversation.</i></h1>
          <p>Tell us what you have in mind—even if it is only the beginning of an idea. We usually reply within two business days.</p>
          <div className="contact-steps">
            <div><span>01</span><p><b>You send a note</b>Share the idea, references, timing, or simply what you are trying to achieve.</p></div>
            <div><span>02</span><p><b>We think it through</b>You get an honest response from someone who will actually work on the project.</p></div>
            <div><span>03</span><p><b>We shape it together</b>A short call to align on scope, creative direction, and the next step.</p></div>
          </div>
        </Reveal>
        <Reveal className="form-wrap" delay={.1}>
          {!sent ? <form onSubmit={submit}>
            <div className="field-row"><label>First name<input required placeholder="Your first name" /></label><label>Last name<input required placeholder="Your last name" /></label></div>
            <label>Business name <em>Optional</em><input placeholder="Company or studio" /></label>
            <div className="field-row"><label>Country<select required defaultValue=""><option value="" disabled>Select country</option><option>Pakistan</option><option>United States</option><option>United Kingdom</option><option>United Arab Emirates</option><option>Other</option></select></label><label>Email address<input required type="email" placeholder="you@company.com" /></label></div>
            <label>Tell us about your project<textarea required rows="6" placeholder="What are you hoping to create?" /></label>
            <button className="submit" type="submit">Send your message <MoveRight /></button>
          </form> :
            <motion.div className="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><span>✓</span><h2>Message received.</h2><p>Thanks for reaching out. We will get back to you shortly.</p><button onClick={() => setSent(false)}>Send another message</button></motion.div>}
        </Reveal>
      </section>
      <Stats />
      <FAQ />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Cursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
