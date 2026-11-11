import { useEffect, useRef, useState } from "react";
import { MEUS, REFERENCIAS, SUGESTOES, capa, mp4, type Video } from "./videos";

// Happy Avatar (estudo, 11/11/2026): perfil da influenciadora (criativos, referências e sugestões) e os projetos,
// cada um uma marca cadastrada pelo link. Sem login, um usuário genérico. A leitura é a da MimeClip (orchestrator /happy).
const API = "https://automation-orchestrator.onrender.com/happy";
const simulando = () => new URLSearchParams(location.search).has("simular");

// auto = toca sozinho quando aparece (só os do topo); os das fileiras tocam ao passar o mouse ou tocar, para não
// decodificar dezenas de vídeos ao mesmo tempo (o navegador travou no teste com todos tocando)
function CardVideo({ v, auto = false }: { v: Video; auto?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocar, setTocar] = useState(false);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!auto || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setTocar(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [auto]);
  useEffect(() => { const el = ref.current; if (!el) return; if (tocar) el.play().catch(() => {}); else el.pause(); }, [tocar]);
  return (
    <div className="card-video" onMouseEnter={() => !auto && setTocar(true)} onMouseLeave={() => !auto && setTocar(false)} onClick={() => !auto && setTocar((t) => !t)}>
      <img src={capa(v.id)} alt="" loading="lazy" />
      <video ref={ref} src={tocar ? mp4(v.id) : undefined} muted loop playsInline preload="none" />
      <div className="sombra" />
      {(v.criador || v.marca) && (
        <div className="quem"><span /><span><b>{v.criador}{v.marca ? ` x ${v.marca}` : ""}</b></span></div>
      )}
      <div className="formato">▶ {v.formato}</div>
    </div>
  );
}

function Fileira({ titulo, texto, videos }: { titulo: string; texto: string; videos: Video[] }) {
  return (
    <section className="secao">
      <div className="secao-cab"><div><h2>{titulo}</h2><p className="suave" style={{ margin: "4px 0 0" }}>{texto}</p></div><span className="suave">{videos.length} vídeos</span></div>
      <div className="fileira">{videos.map((v) => <CardVideo key={v.id} v={v} />)}</div>
    </section>
  );
}

function Perfil({ irProjetos }: { irProjetos: () => void }) {
  return (
    <>
      <section className="hero">
        <div>
          <div className="perfil-cab">
            <div className="avatar">H</div>
            <div><b>@sua.criadora</b><div className="suave">Criadora de UGC · moda, beleza e lifestyle</div></div>
          </div>
          <h1>Meus criativos</h1>
          <p className="suave" style={{ fontSize: 18, marginTop: 14, maxWidth: 520 }}>Tudo o que você já entregou, referências que funcionam e ideias para o próximo anúncio.</p>
          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            <button className="btn" onClick={irProjetos}>+ Novo projeto</button>
            <a className="btn claro" href="#referencias">Ver referências</a>
          </div>
          <div className="numeros">
            <div><b>{MEUS.length}</b><span className="suave">criativos</span></div>
            <div><b>{REFERENCIAS.length}</b><span className="suave">referências</span></div>
            <div><b>{SUGESTOES.length}</b><span className="suave">sugestões</span></div>
          </div>
        </div>
        <div className="hero-videos">{MEUS.slice(0, 2).map((v) => <CardVideo key={v.id} v={v} auto />)}</div>
      </section>
      <Fileira titulo="Meus criativos" texto="Os anúncios que você produziu." videos={MEUS} />
      <div id="referencias" />
      <Fileira titulo="Referências criativas" texto="Formatos que estão performando agora." videos={REFERENCIAS} />
      <Fileira titulo="Sugestões criativas" texto="Ideias para o seu próximo anúncio." videos={SUGESTOES} />
    </>
  );
}

// ---- projetos (marcas pelo link) ----
type ItemLista = { id: string; link: string; criado: string; empresa: string; frase: string; logo: string | null; cores: string[] };
type Projeto = {
  id: string; link: string; empresa: string; frase: string; publico?: string; persona?: string; ofertas?: string[]; destaque?: string; diferenciais?: string[];
  mostrar?: string[]; evitar?: string[]; logo: string | null; cores: string[]; fontes?: { titulo?: string; corpo?: string };
  imagens?: { url: string; grupo: string; ficha?: string }[]; momento?: string; posicao?: string; slogan?: string; estilo?: { descricao?: string };
};
const EXEMPLO: Projeto = {
  id: "exemplo", link: "kitchenflow.com.br", empresa: "KitchenFlow", frase: "Aplicativo de etiquetas de validade para cozinhas profissionais",
  publico: "Restaurantes, padarias e cozinhas industriais", ofertas: ["Plano mensal do aplicativo", "Impressora térmica de etiquetas"],
  destaque: "Etiqueta pronta em segundos, direto do celular", diferenciais: ["Funciona sem internet", "Validade calculada sozinha", "Histórico para auditoria"],
  logo: null, cores: ["#7C3AED", "#0F172A", "#FFFFFF"], fontes: { titulo: "Inter", corpo: "Inter" }, slogan: "Validade sem erro", imagens: [],
};

function Painel({ p }: { p: Projeto }) {
  return (
    <article className="cartao painel">
      <div className="painel-cab">
        <div className="logo">{p.logo ? <img src={p.logo} alt="" /> : <b>{p.empresa.slice(0, 1)}</b>}</div>
        <div><h2>{p.empresa}</h2><p className="suave" style={{ margin: "4px 0 0" }}>{p.frase}</p><a className="suave" href={/^https?:/.test(p.link) ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13 }}>{p.link}</a></div>
      </div>
      <div className="grade-2">
        {p.destaque && <div className="bloco"><h3>Principal motivo para comprar</h3><p style={{ margin: 0 }}>{p.destaque}</p></div>}
        {p.publico && <div className="bloco"><h3>Público</h3><p style={{ margin: 0 }}>{p.publico}</p></div>}
        {!!p.diferenciais?.length && <div className="bloco"><h3>Diferenciais</h3><ul>{p.diferenciais.map((d) => <li key={d}>{d}</li>)}</ul></div>}
        {!!p.ofertas?.length && <div className="bloco"><h3>O que vende</h3><ul>{p.ofertas.map((d) => <li key={d}>{d}</li>)}</ul></div>}
        {(p.slogan || p.posicao || p.momento) && (
          <div className="bloco"><h3>Identidade</h3>
            {p.slogan && <p style={{ margin: 0 }}><b>Slogan:</b> {p.slogan}</p>}
            {p.posicao && <p style={{ margin: 0 }}><b>Crença:</b> {p.posicao}</p>}
            {p.momento && <p style={{ margin: 0 }}><b>Quando lembram dela:</b> {p.momento}</p>}
          </div>
        )}
        <div className="bloco"><h3>Cores e letras</h3>
          <div className="cores">{p.cores.map((c) => <span key={c}><i style={{ background: c }} />{c}</span>)}</div>
          {p.fontes && <p className="suave" style={{ margin: 0, fontSize: 14 }}>Títulos: {p.fontes.titulo || "—"} · Texto: {p.fontes.corpo || "—"}</p>}
        </div>
        {!!p.mostrar?.length && <div className="bloco"><h3>Mostrar</h3><ul>{p.mostrar.map((d) => <li key={d}>{d}</li>)}</ul></div>}
        {!!p.evitar?.length && <div className="bloco"><h3>Evitar</h3><ul>{p.evitar.map((d) => <li key={d}>{d}</li>)}</ul></div>}
      </div>
      {!!p.imagens?.length && (
        <div className="bloco"><h3>Imagens da marca</h3>
          <div className="imagens">{p.imagens.slice(0, 24).map((im) => <figure key={im.url}><img src={im.url} alt="" loading="lazy" /><figcaption>{im.grupo}</figcaption></figure>)}</div>
        </div>
      )}
    </article>
  );
}

function Projetos() {
  const [lista, setLista] = useState<ItemLista[]>([]);
  const [aberto, setAberto] = useState<Projeto | null>(null);
  const [link, setLink] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [lendo, setLendo] = useState<{ id: string; achados: string[]; inicio: number } | null>(null);
  const [agora, setAgora] = useState(Date.now());

  async function carregar(abrirId?: string) {
    if (simulando()) { setLista([{ ...EXEMPLO, criado: new Date().toISOString() }]); setAberto(EXEMPLO); return; }
    const d = await fetch(`${API}/projetos`).then((r) => r.json()).catch(() => null);
    const l: ItemLista[] = d?.projetos || [];
    setLista(l);
    const alvo = abrirId || l[0]?.id;
    if (alvo) abrir(alvo);
  }
  async function abrir(id: string) {
    if (simulando()) { setAberto(EXEMPLO); return; }
    const d = await fetch(`${API}/projeto?id=${encodeURIComponent(id)}`).then((r) => r.json()).catch(() => null);
    if (d?.projeto) setAberto(d.projeto);
  }
  useEffect(() => { carregar(); }, []);
  useEffect(() => { if (!lendo) return; const t = setInterval(() => setAgora(Date.now()), 1000); return () => clearInterval(t); }, [lendo]);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!link.trim()) return;
    if (simulando()) { setLendo({ id: "sim", achados: ["Abrindo o site..."], inicio: Date.now() }); setTimeout(() => { setLendo(null); setLink(""); carregar(); }, 4000); return; }
    const d = await fetch(`${API}/ler`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ link }) }).then((r) => r.json()).catch(() => null);
    if (d?.status !== "ok") { setErro(d?.error || "Não deu para começar agora. Tente de novo."); return; }
    setLendo({ id: d.id, achados: [], inicio: Date.now() });
  }
  useEffect(() => {
    if (!lendo || simulando()) return;
    let vivo = true;
    (async () => {
      while (vivo) {
        const d = await fetch(`${API}/leitura?id=${lendo.id}`).then((r) => r.json()).catch(() => null);
        if (!vivo) return;
        if (d?.achados) setLendo((l) => (l ? { ...l, achados: d.achados.map((a: { tipo: string; texto?: string; total?: number }) => textoAchado(a)) } : l));
        if (d?.status === "pronto") { await new Promise((r) => setTimeout(r, 2500)); setLendo(null); setLink(""); carregar(lendo.id); return; }
        if (d?.status === "erro" || d?.status === "not_found") { setErro(d?.erro || "A leitura parou no meio. Tente de novo."); setLendo(null); return; }
        await new Promise((r) => setTimeout(r, 4000));
      }
    })();
    return () => { vivo = false; };
  }, [lendo?.id]);

  const seg = lendo ? Math.round((agora - lendo.inicio) / 1000) : 0;
  return (
    <div className="projetos">
      <aside className="lista">
        <form className="cartao novo" onSubmit={cadastrar}>
          <b>Nova marca</b>
          <span className="suave" style={{ fontSize: 14 }}>Cole o link do site ou da página de vendas. A gente aprende a marca sozinho.</span>
          <label htmlFor="ha-link" className="suave" style={{ fontSize: 13 }}>Link do site</label>
          <input id="ha-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="www.marca.com.br" inputMode="url" disabled={!!lendo} />
          <button className="btn" type="submit" disabled={!!lendo || !link.trim()}>{lendo ? "Aprendendo a marca..." : "Cadastrar marca"}</button>
          {erro && <p className="erro" role="alert">{erro}</p>}
          {lendo && (
            <div className="achados">
              <div className="barra"><i style={{ width: `${Math.min(95, 100 * (1 - Math.exp(-seg / 90)))}%` }} /></div>
              <span className="suave">{Math.floor(seg / 60)}:{String(seg % 60).padStart(2, "0")} · leva de 2 a 4 minutos</span>
              {lendo.achados.map((a, i) => <span key={i}>✓ {a}</span>)}
            </div>
          )}
        </form>
        <b style={{ marginTop: 8 }}>Meus projetos ({lista.length})</b>
        {lista.map((p) => (
          <button key={p.id} className="item-projeto" aria-current={aberto?.id === p.id} onClick={() => abrir(p.id)}>
            <span className="logo">{p.logo ? <img src={p.logo} alt="" /> : <b>{(p.empresa || "?").slice(0, 1)}</b>}</span>
            <span style={{ minWidth: 0 }}><b style={{ display: "block" }}>{p.empresa || p.link}</b><span className="suave" style={{ fontSize: 13, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.frase || p.link}</span></span>
          </button>
        ))}
        {!lista.length && <p className="suave" style={{ fontSize: 14 }}>Nenhuma marca ainda. Cadastre a primeira acima.</p>}
      </aside>
      {aberto ? <Painel p={aberto} /> : <div className="cartao vazio">Escolha um projeto ou cadastre uma marca nova.</div>}
    </div>
  );
}

function textoAchado(a: { tipo: string; texto?: string; total?: number; itens?: string[] }) {
  if (a.tipo === "logo") return "Encontramos a logo";
  if (a.tipo === "cores") return "Pegamos as cores";
  if (a.tipo === "fontes") return "Vimos as letras do site";
  if (a.tipo === "imagens") return a.total ? `Separamos ${a.total} imagens` : "Achamos as imagens";
  if (a.tipo === "oferta") return "Entendemos o que a marca vende";
  if (a.tipo === "diferenciais") return `Achamos ${a.itens?.length || 0} diferenciais`;
  return a.texto || a.tipo;
}

export default function App() {
  const [aba, setAba] = useState<"perfil" | "projetos">(() => (location.hash === "#projetos" ? "projetos" : "perfil"));
  const ir = (a: "perfil" | "projetos") => { setAba(a); history.replaceState(null, "", a === "projetos" ? "#projetos" : "#"); window.scrollTo({ top: 0 }); };
  return (
    <div className="pagina">
      <header className="topo">
        <div className="marca"><i>☺</i> Happy Avatar</div>
        <nav className="abas" role="tablist" aria-label="Seções">
          <button role="tab" aria-selected={aba === "perfil"} onClick={() => ir("perfil")}>Perfil</button>
          <button role="tab" aria-selected={aba === "projetos"} onClick={() => ir("projetos")}>Meus projetos</button>
        </nav>
      </header>
      {aba === "perfil" ? <Perfil irProjetos={() => ir("projetos")} /> : <Projetos />}
    </div>
  );
}
