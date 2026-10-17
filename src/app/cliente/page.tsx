'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Cliente() {
  const bannersOriginaisCL = [
    '/bannercl1.png',
    '/bannercl2.png',
    '/bannercl3.png',
    '/bannercl4.png',
    '/bannercl5.png'
  ];
  const bannersCL = [...bannersOriginaisCL, bannersOriginaisCL[0]];

  const [bannerAtual, setBannerAtual] = useState(0);
  const carrosselRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  const pausarPorInteracao = () => {
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 5000);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (isInteracting.current) return;
      if (!carrosselRef.current) return;

      const larguraBanner = carrosselRef.current.clientWidth;
      
      setBannerAtual((prev) => {
        const proximo = prev + 1;

        if (proximo >= bannersCL.length) {
          carrosselRef.current?.scrollTo({ left: 0, behavior: 'auto' });
          setBannerAtual(0);
          return 0;
        }

        carrosselRef.current?.scrollTo({
          left: proximo * larguraBanner,
          behavior: 'smooth'
        });

        if (proximo === bannersCL.length - 1) {
          setTimeout(() => {
            if (carrosselRef.current) {
              carrosselRef.current.scrollTo({ left: 0, behavior: 'auto' });
            }
            setBannerAtual(0);
          }, 600);
          return 0;
        }

        return proximo;
      });
    }, 3500);

    return () => {
      clearInterval(intervalo);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [bannersCL.length]);

  const handleScroll = () => {
    if (!carrosselRef.current) return;
    const larguraBanner = carrosselRef.current.clientWidth;
    const scrollAtual = carrosselRef.current.scrollLeft;
    let indexCalculado = Math.round(scrollAtual / larguraBanner);
    
    if (indexCalculado >= bannersOriginaisCL.length) {
      indexCalculado = 0;
    }

    if (indexCalculado !== bannerAtual && indexCalculado >= 0 && indexCalculado < bannersOriginaisCL.length) {
      setBannerAtual(indexCalculado);
    }
  };

  const [comprasCount] = useState({
    aPagar: 2,
    preparando: 4,
    aCaminho: 5,
    saiuEntrega: 1,
    avaliar: 6
  });

  const menuItems = [
    { label: 'OFERTAS RELÂMPAGO', icon: '/ofert relan.png', href: '/ofertas' },
    { label: 'LISTA DE DESEJOS', icon: '/desejos.png', href: '/desejos' },
    { label: 'CUPONS', icon: '/cupons.png', href: '/cupons' },
    { label: 'FESTCOINS', icon: '/festcons.png', href: '/festcoins' },
    { label: 'REEMBOLSO', icon: '/reenbolso.png', href: '/reembolso' },
    { label: 'CENTRAL DE AJUDA', icon: '/ajuda.png', href: '/ajuda' },
  ];

  return (
    <div
      className="min-h-screen w-full text-white flex flex-col items-center pb-10 bg-repeat bg-top overflow-x-hidden relative font-sans"
      style={{
        backgroundImage: "url('/fundo cliente.png')",
        backgroundSize: "100% auto",
        backgroundColor: "#000511"
      }}
    >
      <style jsx global>{`
        .borda-chanfrada {
          clip-path: polygon(
            12px 0%,
            calc(100% - 12px) 0%,
            100% 12px,
            100% calc(100% - 12px),
            calc(100% - 12px) 100%,
            12px 100%,
            0% calc(100% - 12px),
            0% 12px
          );
        }

        .borda-chanfrada-pequena {
          clip-path: polygon(
            6px 0%,
            calc(100% - 6px) 0%,
            100% 6px,
            100% calc(100% - 6px),
            calc(100% - 6px) 100%,
            6px 100%,
            0% calc(100% - 6px),
            0% 6px
          );
        }

        .moldura-neon-solida {
          background: linear-gradient(135deg, #00f0ff, #0066ff, #00f0ff);
          padding: 1.5px;
          filter: drop-shadow(0 0 5px rgba(0, 240, 255, 0.6));
        }

        .borda-degrade-btn {
          background: linear-gradient(#00012a, #00012a) padding-box,
                      linear-gradient(90deg, #00f0ff, #0066ff, #00f0ff) border-box;
          border: 2px solid transparent;
        }

        .fundo-card-solido {
          background-color: #000921;
          width: 100%;
          height: 100%;
        }

        .retangulo-topo-solido {
          background-color: #00012a;
          width: 100%;
        }

        /* Linha divisória neon na transição do cabeçalho */
        .linha-divisoria-neon {
          background: linear-gradient(90deg, transparent, #00f0ff, #0066ff, #00f0ff, transparent);
          height: 2px;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.8);
        }

        .btn-cyber-glow {
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .btn-cyber-glow:hover {
          transform: translateY(-2px);
          filter: brightness(1.2);
        }
        .btn-cyber-glow:active {
          transform: scale(0.95) translateY(1px);
          filter: brightness(0.9);
        }

        .formato-hexagono {
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }

        .borda-banner-hex {
          clip-path: polygon(
            20px 0%,
            calc(100% - 20px) 0%,
            100% 50%,
            calc(100% - 20px) 100%,
            20px 100%,
            0% 50%
          );
        }

        .borda-hex-pilula {
          clip-path: polygon(
            8px 0%,
            calc(100% - 8px) 0%,
            100% 50%,
            calc(100% - 8px) 100%,
            8px 100%,
            0% 50%
          );
        }
      `}</style>

      {/* HEADER DA ÁREA DO CLIENTE */}
      <header className="w-full retangulo-topo-solido px-4 pt-4 pb-5 shadow-xl relative z-50">
        <div className="w-full max-w-md mx-auto flex items-start justify-between relative min-h-[160px]">
          
          <div className="flex flex-col gap-3.5 w-full pr-16">
            
            <Link href="/" className="w-max">
              <div className="moldura-neon-solida borda-chanfrada-pequena shadow-md cursor-pointer btn-cyber-glow">
                <div className="fundo-card-solido borda-chanfrada-pequena px-3.5 py-1.5 flex items-center gap-1.5">
                  <span className="text-cyan-400 text-[10px] font-bold">❮</span>
                  <span className="text-[10px] font-black tracking-wider text-white uppercase">INÍCIO</span>
                </div>
              </div>
            </Link>

            <div className="relative w-full h-[80px] my-1">
              
              <div 
                className="absolute top-[14px] left-[0px] w-[300px] h-[62px] moldura-neon-solida borda-banner-hex shadow-xl z-10"
                style={{ padding: '3px' }}
              >
                <div className="fundo-card-solido borda-banner-hex pl-[75px] pr-6 flex items-center w-full h-full">
                  <span className="text-[14px] font-black tracking-wider text-white uppercase whitespace-nowrap drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]">
                    BEM VINDO, EVERTON!
                  </span>
                </div>
              </div>

              <div 
                className="absolute left-[0px] top-[13px] w-18 h-16 moldura-neon-solida formato-hexagono z-20 shadow-md"
                style={{ padding: '3px' }}
              >
                <div className="w-full h-full fundo-card-solido formato-hexagono p-[1.5px]">
                  <img 
                    src="/perfil.jpeg" 
                    alt="Foto Perfil" 
                    className="w-full h-full object-cover formato-hexagono" 
                  />
                </div>
              </div>

              <Link 
                href="/perfil" 
                className="absolute top-[63px] left-[170px] w-[110px] h-[26px] z-30"
              >
                <div className="w-full h-full moldura-neon-solida borda-hex-pilula shadow-lg cursor-pointer btn-cyber-glow">
                  <div className="fundo-card-solido borda-hex-pilula px-2 py-0.5 flex items-center justify-center gap-1.5 w-full h-full">
                    <span className="text-[9.5px] font-black tracking-wider text-white uppercase">Meu Perfil</span>
                    <span className="text-cyan-400 text-[9px] font-bold">❯</span>
                  </div>
                </div>
              </Link>

            </div>

            <Link href="/fidelidade" className="w-max mt-2 block">
              <div className="moldura-neon-solida borda-chanfrada-pequena shadow-md cursor-pointer btn-cyber-glow">
                <div className="fundo-card-solido borda-chanfrada-pequena px-3 py-1 flex items-center gap-2">
                  <div 
                    className="flex items-center justify-center relative shrink-0" 
                    style={{ width: '27px', height: '27px' }}
                  >
                    <img 
                      src="/fidelidad.png" 
                      alt="Nível" 
                      className="object-contain" 
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-white uppercase">DIAMANTE</span>
                  <span className="text-cyan-400 text-[10px] font-bold">❯</span>
                </div>
              </div>
            </Link>

          </div>

          {/* ÍCONES DO TOPO */}
          <div className="absolute right-0 top-0 flex flex-col items-center gap-4 z-30">
            <button className="w-11 h-11 rounded-xl borda-degrade-btn flex items-center justify-center shadow-md cursor-pointer btn-cyber-glow p-0">
              <img src="/engrenagem.png" alt="Configurações" className="w-10 h-10 object-contain filter brightness-125" />
            </button>
            <div className="relative">
              <button className="w-11 h-11 rounded-xl borda-degrade-btn flex items-center justify-center shadow-md cursor-pointer btn-cyber-glow p-0">
                <img src="/carrinho cliente.png" alt="Carrinho" className="w-10 h-10 object-contain filter brightness-125" />
              </button>
              <span className="absolute -top-1 -right-1 bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white z-10 shadow">
                42
              </span>
            </div>
            <div className="relative">
              <button className="w-11 h-11 rounded-xl borda-degrade-btn flex items-center justify-center shadow-md cursor-pointer btn-cyber-glow p-0">
                <img src="/mensagem.png" alt="Mensagens" className="w-17 h-17 object-contain filter brightness-125" />
              </button>
              <span className="absolute -top-1 -right-1 bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white z-10 shadow">
                10
              </span>
            </div>
          </div>

        </div>

        {/* Linha divisória neon na base do header */}
        <div className="absolute bottom-0 left-0 w-full linha-divisoria-neon"></div>
      </header>

      <main className="w-full max-w-md px-3 flex flex-col gap-4 mt-2">
        
        {/* SEÇÃO: MINHAS COMPRAS COM ESCALA OTIMIZADA DE 0.86 */}
        <section className="moldura-neon-solida borda-chanfrada shadow-xl w-full relative mt-4">
          <div className="fundo-card-solido borda-chanfrada px-[12px] pt-5 pb-3.5 relative min-h-[135px]">
            
            <div className="absolute left-[-7px] -top-[1px] z-20">
              <div className="moldura-neon-solida borda-chanfrada-pequena shadow-sm">
                <div className="fundo-card-solido borda-chanfrada-pequena px-4 py-1.5">
                  <h3 className="text-[12px] font-black tracking-wider text-white uppercase">Minhas Compras</h3>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center mb-3 border-b border-cyan-500/20 pb-1.5">
              <Link href="/historico" className="w-max">
                <div className="moldura-neon-solida borda-chanfrada-pequena shadow-md cursor-pointer btn-cyber-glow">
                  <div className="fundo-card-solido borda-chanfrada-pequena px-3 py-1 flex items-center gap-1.5">
                    <span className="text-[9px] font-black tracking-wider text-white uppercase">Ver histórico</span>
                    <span className="text-cyan-400 text-[10px] font-bold">❯</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* CONTAINER COM ESCALA 0.86 (UM POUCO MAIOR QUE 0.82, MAS CABENDO TUDO) */}
            <div className="w-full py-1 flex justify-center items-center">
              <div className="relative w-[385px] h-[75px] shrink-0 scale-[0.86] origin-center">
                
                <div className="absolute left-[0px] top-[-3px] cursor-pointer group">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <img src="/pagar.png" alt="A Pagar" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    {comprasCount.aPagar > 0 && (
                      <span className="absolute -top-[-9px] -right-[-2px] bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow z-20">
                        {comprasCount.aPagar}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute left-[13px] top-[56px] text-[10px] font-bold text-white whitespace-nowrap">
                  A Pagar
                </span>

                <div className="absolute left-[62px] top-[30px] flex items-center gap-0.5 opacity-80 pointer-events-none">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                </div>

                <div className="absolute left-[78px] top-[-3px] cursor-pointer group">
                  <div className="relative w-17 h-17 flex items-center justify-center">
                    <img src="/preparando.png" alt="Preparando" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    {comprasCount.preparando > 0 && (
                      <span className="absolute -top-[-10px] -right-[-2px] bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow z-20">
                        {comprasCount.preparando}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute left-[89px] top-[57px] text-[10px] font-bold text-white whitespace-nowrap">
                  Preparando
                </span>

                <div className="absolute left-[144px] top-[30px] flex items-center gap-0.5 opacity-80 pointer-events-none">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                </div>

                <div className="absolute left-[159px] top-[-14px] cursor-pointer group">
                  <div className="relative w-22 h-23 flex items-center justify-center">
                    <img src="/caminhão.png" alt="A Caminho" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    {comprasCount.aCaminho > 0 && (
                      <span className="absolute -top-[-22px] -right-[-5px] bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow z-20">
                        {comprasCount.aCaminho}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute left-[183px] top-[57px] text-[10px] font-bold text-white whitespace-nowrap">
                  A Caminho
                </span>

                <div className="absolute left-[243px] top-[30px] flex items-center gap-0.5 opacity-80 pointer-events-none">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                </div>

                <div className="absolute left-[263px] top-[1px] cursor-pointer group">
                  <div className="relative w-15 h-15 flex items-center justify-center">
                    <img src="/entregador.png" alt="Saiu pra Entrega" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    {comprasCount.saiuEntrega > 0 && (
                      <span className="absolute -top-[-8px] -right-[-2px] bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow z-20">
                        {comprasCount.saiuEntrega}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute left-[262px] top-[58px] text-[10px] font-bold text-white leading-tight text-center w-[75px]">
                  Saiu pra Entrega
                </span>

                <div className="absolute left-[323px] top-[30px] flex items-center gap-0.5 opacity-80 pointer-events-none">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00f0ff]" />
                </div>

                <div className="absolute left-[334px] top-[3px] cursor-pointer group">
                  <div className="relative w-15 h-15 flex items-center justify-center">
                    <img src="/avaliaçao.png" alt="Avaliar" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                    {comprasCount.avaliar > 0 && (
                      <span className="absolute -top-[-7px] -right-[-3px] bg-[#0066ff] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow z-20">
                        {comprasCount.avaliar}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute left-[348px] top-[57px] text-[10px] font-bold text-white whitespace-nowrap">
                  Avaliar
                </span>

              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO DUPLA COM O BANNER RESPONSIVO CORRIGIDO */}
        <div className="grid grid-cols-[1fr_1.15fr] gap-3 items-stretch">
          
          <Link href="/ofertas" className="block w-full h-full">
            <div 
              className="moldura-neon-solida borda-chanfrada shadow-xl h-full cursor-pointer btn-cyber-glow"
              style={{ padding: '3px' }}
            >
              <div 
                className="fundo-card-solido borda-chanfrada relative overflow-hidden w-full h-full min-h-[355px]"
                onTouchStart={pausarPorInteracao}
                onMouseDown={pausarPorInteracao}
              >
                <div 
                  ref={carrosselRef}
                  onScroll={handleScroll}
                  className="absolute inset-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {bannersCL.map((src, index) => (
                    <div key={`${src}-${index}`} className="w-full h-full shrink-0 snap-center relative">
                      <img 
                        src={src} 
                        alt={`Banner CL ${index + 1}`} 
                        className="w-full h-full object-fill absolute inset-0 pointer-events-none" 
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-20 pointer-events-none">
                  {bannersOriginaisCL.map((_, index) => (
                    <span 
                      key={index} 
                      className={`rounded-full transition-all duration-300 ${
                        bannerAtual === index 
                          ? "w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_6px_#00f0ff] scale-110" 
                          : "w-1.5 h-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-col justify-between gap-2 h-full">
            {menuItems.map((item, idx) => (
              <div key={idx} className="moldura-neon-solida borda-chanfrada h-[52px] cursor-pointer btn-cyber-glow">
                <div className="fundo-card-solido borda-chanfrada px-3 py-2 flex items-center justify-between h-full">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 flex items-center justify-center shrink-0">
                      <img src={item.icon} alt="" className="w-11 h-11 object-contain" />
                    </div>
                    <span className="text-[9.5px] font-black tracking-tight text-white leading-tight uppercase">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-cyan-400 text-xs font-bold">❯</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}