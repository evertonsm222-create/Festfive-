'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const produtos = [
    {
      id: 1,
      imagem: "/fem.jpeg",
      linha1: "Camiseta Feminina Lisa 100",
      linha2: "% Algodão Premium ...",
      preco: "R$ 45,90",
      vendidos: "68 vendidos ...",
      parcelamento: "ou 10x de R$ 8,49 sem juros",
      alturaCard: "h-40"
    },
    {
      id: 2,
      imagem: "/masc.jpeg",
      linha1: "Camiseta Polo Oslo Italy 18",
      linha2: "76 Edição Limitada ...",
      preco: "R$ 59,76",
      vendidos: "87 vendidos ...",
      parcelamento: "ou 10x de R$ 12,34 sem juros",
      alturaCard: "h-40"
    },
    {
      id: 3,
      imagem: "/inf.jpeg",
      linha1: "Conjunto Infantil Estampad",
      linha2: "Verão ...",
      preco: "R$ 39,90",
      vendidos: "42 vendidos ...",
      parcelamento: "ou 10x de R$ 4,39 sem juros",
      alturaCard: "h-40"
    },
    {
      id: 4,
      imagem: "/casal.jpeg",
      linha1: "Kit Camisas Casal Match Na",
      linha2: "morados ...",
      preco: "R$ 89,90",
      vendidos: "115 vendidos ...",
      parcelamento: "ou 10x de R$ 9,89 sem juros",
      alturaCard: "h-40"
    },
    {
      id: 5,
      imagem: "/masc.jpeg",
      linha1: "Bermuda Jeans Slim Comfo",
      linha2: "rt Masculina hjff...",
      preco: "R$ 79,90",
      vendidos: "54 vendidos ...",
      parcelamento: "ou 10x de R$ 9,15 sem juros",
      alturaCard: "h-40"
    },
    {
      id: 6,
      imagem: "/fem.jpeg",
      linha1: "Vestido Casual Midi Elegant",
      linha2: "e Festa ...",
      preco: "R$ 99,90",
      vendidos: "132 vendidos ...",
      parcelamento: "ou 10x de R$ 11,20 sem juros",
      alturaCard: "h-40"
    }
  ];

  const banners = [
    "/banner.png",
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png"
  ];

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

  // Auto-play contínuo e infinito para a frente
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (isInteracting.current) return;

      setBannerAtual((prev) => {
        const proximo = prev + 1;
        if (carrosselRef.current) {
          const larguraBanner = carrosselRef.current.clientWidth;
          
          if (proximo >= banners.length) {
            // Vai para o primeiro de forma fluida simulando o giro contínuo
            carrosselRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
            return 0;
          } else {
            carrosselRef.current.scrollTo({
              left: proximo * larguraBanner,
              behavior: 'smooth'
            });
          }
        }
        return proximo >= banners.length ? 0 : proximo;
      });
    }, 3500);

    return () => {
      clearInterval(intervalo);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [banners.length]);

  const handleScroll = () => {
    if (!carrosselRef.current) return;
    const larguraBanner = carrosselRef.current.clientWidth;
    const scrollAtual = carrosselRef.current.scrollLeft;
    const indexCalculado = Math.round(scrollAtual / larguraBanner);
    
    if (indexCalculado !== bannerAtual && indexCalculado >= 0 && indexCalculado < banners.length) {
      setBannerAtual(indexCalculado);
    }
  };

  return (
    <div 
      className="min-h-screen w-full text-white flex flex-col items-center pb-12 bg-repeat bg-top"
      style={{ 
        backgroundImage: "url('/fundo.png')",
        backgroundSize: "100% auto",
        backgroundColor: "#00092d"
      }}
    >
      
      {/* HEADER */}
      <header className="w-full px-2 pt-5 pb-3 flex flex-col gap-4 bg-[#00092d] relative z-50">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-80 h-28 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="FestFive Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 w-full">
          <div className="flex-1 relative flex items-center bg-white rounded-xl border-2 border-[#1342e2] overflow-hidden shadow-sm h-10">
            <input
              type="text"
              placeholder="Buscar produto ou ofertas!"
              style={{ fontSize: "13px" }}
              className="w-full h-full bg-transparent text-[#1342e2] placeholder-[#1342e2] px-4 pr-12 focus:outline-none"
            />
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ width: '50px', height: '49px' }}
            >
              <img src="/lupa.png" alt="Pesquisar" className="w-full h-full object-fill" />
            </div>
          </div>

          <button className="w-10 h-10 rounded-xl border border-blue-500/60 bg-[#00092d] flex items-center justify-center transition-colors shrink-0 overflow-hidden shadow-sm">
            <img src="/perfil.jpeg" alt="Perfil" className="w-full h-full object-cover" />
          </button>

          <div className="relative shrink-0">
            <button className="w-10 h-10 rounded-xl border border-blue-500/60 bg-[#00092d] flex items-center justify-center transition-colors overflow-hidden shadow-sm">
              <img src="/carrinho.jpeg" alt="Carrinho" className="w-full h-full object-cover" />
            </button>
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              0
            </span>
          </div>
        </div>
      </header>

      {/* CARROSSEL */}
      <main className="w-full max-w-md px-4 flex flex-col mt-0">
        <div className="relative w-screen left-1/2 -translate-x-1/2 mb-3">
          <div 
            ref={carrosselRef}
            onScroll={handleScroll}
            onTouchStart={pausarPorInteracao}
            onMouseDown={pausarPorInteracao}
            className="w-full h-72 flex overflow-x-auto snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
          >
            {banners.map((src, index) => (
              <div key={src} className="w-full h-full shrink-0 snap-center relative">
                <img 
                  src={src} 
                  alt={`Banner ${index + 1}`} 
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>
            
          {/* Bolinhas indicadoras */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-20 pointer-events-none">
            {banners.map((_, index) => (
              <span 
                key={index} 
                className={`rounded-full transition-all duration-300 ${
                  bannerAtual === index 
                    ? "w-2.5 h-2.5 bg-white shadow scale-110" 
                    : "w-1.5 h-1.5 bg-white/50"
                }`}
              ></span>
            ))}
          </div>

        </div>
      </main>

      {/* CATEGORIAS */}
      <section className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 w-max px-2">
          <div className="flex flex-col items-center cursor-pointer shrink-0">
            <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-blue-500/30 shadow-sm">
              <img src="/fem.jpeg" alt="Moda Feminina" className="w-full h-full object-cover scale-[1.03]" />
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer shrink-0">
            <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-blue-500/30 shadow-sm">
              <img src="/masc.jpeg" alt="Moda Masculina" className="w-full h-full object-cover scale-[1.03]" />
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer shrink-0">
            <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-blue-500/30 shadow-sm">
              <img src="/inf.jpeg" alt="Moda Infantil" className="w-full h-full object-cover scale-[1.03]" />
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer shrink-0">
            <div className="w-[112px] h-[112px] rounded-full overflow-hidden border-2 border-blue-500/30 shadow-sm">
              <img src="/casal.jpeg" alt="Moda Casal" className="w-full h-full object-cover scale-[1.03]" />
            </div>
          </div>
        </div>
      </section>

      {/* LISTA DE PRODUTOS */}
      <main className="w-full max-w-md px-2 flex flex-col mt-2">
        <section className="w-full">
          <div className="grid grid-cols-2 gap-2 items-stretch">
            
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col justify-between border border-gray-200">
                
                {/* Imagem do Card */}
                <div className={`w-full ${produto.alturaCard} bg-gray-50 relative flex items-center justify-center p-2 shrink-0`}>
                  <img src="/perfil.jpeg" alt={produto.linha1} className="w-full h-full object-contain" />
                </div>

                {/* Área de Texto */}
                <div className="p-2.5 flex flex-col justify-between flex-1 text-gray-900 w-full">
                  
                  {/* Bloco do Título */}
                  <div className="flex flex-col gap-0.5 w-full">
                    <h4 className="text-xs font-black text-gray-900 leading-tight whitespace-nowrap overflow-hidden w-full">
                      {produto.linha1}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 w-full">
                      <span className="bg-[#0095ff] text-white text-[9px] px-1.5 py-0.5 rounded font-black shrink-0">
                        Indicado
                      </span>
                      <span className="text-xs font-black text-gray-900 truncate flex-1">
                        {produto.linha2}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bloco inferior */}
                  <div className="mt-1.5 w-full">
                    <div className="flex justify-between items-baseline w-full">
                      <div className="text-sm font-black text-gray-900 whitespace-nowrap">{produto.preco}</div>
                      <div className="text-[10px] text-gray-800 font-bold whitespace-nowrap">
                        {produto.vendidos}
                      </div>
                    </div>
                    
                    <span className="text-[10px] text-gray-700 font-bold block mt-0.5">{produto.parcelamento}</span>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>
      </main>

    </div>
  );
}