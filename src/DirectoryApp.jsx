import React, { useState, useEffect, useRef } from 'react';
import { Twitter } from 'lucide-react';

const DirectoryApp = () => {
  // 1. State and ref declarations
  const [selectedTag, setSelectedTag] = useState(null);
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scaleRef = useRef(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const projectImages = useRef({});
  const [cryptoPrice, setCryptoPrice] = useState(null);

  // 2. Data constants
  const items = [
    { 
      id: 1, 
      name: 'felix', 
      tag: 'Defi', 
      twitter: 'https://x.com/felixprotocol',
      logo: '/images/logos/felix-logo.png'
    },
    { 
      id: 2, 
      name: 'hyperland', 
      tag: 'Defi', 
      twitter: 'https://x.com/hyperlendx',
      logo: '/images/logos/hyperland-logo.png'
    },
    { 
      id: 3, 
      name: 'funfun', 
      tag: 'meme', 
      twitter: 'https://x.com/fan_dot_fun',
      logo: '/images/logos/funfun-logo.png'
    },
    { 
      id: 4, 
      name: 'stHYPE', 
      tag: 'Staking', 
      twitter: 'https://x.com/stakedhype',
      logo: '/images/logos/sthype-logo.png'
    },
    {
      id: 5,
      name: 'Katōshi',
      tag: 'Trading',
      twitter: 'https://x.com/KatoshiAI',
      logo: '/images/logos/katoshi-logo.png'
    },
    {
      id: 6,
      name: 'HyperSwap',
      tag: 'Defi',
      twitter: 'https://x.com/HyperSwapX',
      logo: '/images/logos/hyperswap-logo.png'
    },  
    {
      id :7,
      name : "Kinetiq",
      tag : "Staking",
      twitter : "https://x.com/kinetiq_xyz",
      logo : "/images/logos/kinetiq-logo.png"
    },
    {
      id :8,
      name : "HyBridge",
      tag : "Infra",
      twitter : "https://x.com/HyBridgeHL",
      logo : "/images/logos/hybridge-logo.png"
    },
    {
      id :9,
      name : "HL Names",
      tag : "Infra",
      twitter : "https://x.com/hlnames",
      logo : "/images/logos/hl-names-logo.png"
    },
    {
      id :10,
      name : "fanfun",
      tag : "Social",
      twitter : "https://x.com/fan_dot_fun",
      logo : "/images/logos/funfun-logo.png"
    },
    {
      id: 11,
      name: 'Kieko Finance',
      tag: 'Defi',
      twitter: 'https://x.com/KeikoFinance',
      logo:'/images/logos/kieko-finance-logo.png'
    },
    {
      id: 12,
      name: 'HFun',
      tag: 'Trading',
      twitter:'https://x.com/Hypurrfun',
      logo:'/images/logos/hfun-logo.png'
    },
    {
      id: 13,
      name:'pvp.trade',
      tag:'Trading',
      twitter:'https://x.com/pvp_dot_trade',
      logo:'/images/logos/pvp-trade-logo.png'
    },
    {
      id: 14,
      name:'HyperData',
      tag:'Data',
      twitter:'https://x.com/hyperfunX',
      logo:'/images/logos/hyperfun-logo.png'
    },
    {
      id: 15,
      name:'PurrBurn',
      tag:'Data',
      twitter:'https://x.com/janklimo',
      logo:'/images/logos/purrburn-logo.png'
    },
    {
      id: 16,
      name:'Hypurrscan',
      tag:'Explorer',
      twitter:'https://x.com/HypurrScan',
      logo:'/images/logos/hypurrscan-logo.png'
    },
    {
      id: 17,
      name:'Yeeti',
      tag:'meme',
      twitter:'https://x.com/YeetiOnHL',
      logo:'/images/logos/yeeti-logo.png'
    },
    {
      id: 18,
      name:'CatCabal',
      tag:'meme',
      twitter:'https://x.com/CatCabal_hl',
      logo:'/images/logos/catcabal-logo.png'
    },
    {
      id: 19,
      name:'Pip',
      tag:'meme',
      twitter:'https://x.com/HypurrScan',
      logo:'/images/logos/hypurrscan-logo.png'
    },
  ];

  const tags = ['Defi', 'meme', 'Staking', 'Trading', 'Infra', 'Social', 'Data', 'Explorer'];
const articles = [
    { title: "Jeff Post-TGE: \"If you're reading this now, you're still early.\"", month: "December", year: "2024", link: "https://x.com/chameleon_jeff/status/1862885996846805222" },
    { title: "The Entire Financial Stack", month: "November", year: "2024", link: "https://x.com/chameleon_jeff/status/1853439016957554873" },
    { title: "The AWS of Liquidity", month: "October", year: "2024", link: "https://x.com/chameleon_jeff/status/1841392573199585291" },
    { title: "Builder Codes", month: "October", year: "2024", link: "https://x.com/HyperliquidX/status/1840955444191473712" },
    { title: "L1 Season 2", month: "May", year: "2024", link: "https://x.com/HyperliquidX/status/1795683649960206488" },
    { title: "When You See a 100x", month: "May", year: "2024", link: "https://x.com/chameleon_jeff/status/1795859763034731002" },
    { title: "Native EVM", month: "May", year: "2024", link: "https://x.com/HyperliquidX/status/1792393508101439800" },
    { title: "HyperBFT (Consensus Algorithm)", month: "May", year: "2024", link: "https://www.notion.so/Hyperliquid-All-Tweets-152f1a87c48c804da5f7cc97e1c8047a" },
    { title: "To House All of Finance", month: "April", year: "2024", link: "https://x.com/chameleon_jeff/status/1784592436792275221" },
    { title: "Native Spot Trading", month: "March", year: "2024", link: "https://x.com/HyperliquidX/status/1773531180815507473" }
  ];
  // 3. Image loading effect
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = items.map(item => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            projectImages.current[item.id] = img;
            resolve();
          };
          img.src = item.logo;
        });
      });

      await Promise.all(loadPromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Rest of your component code remains the same...
  const initializeNodes = () => {
    const nodes = [];
    tags.forEach((tag, i) => {
      nodes.push({
        id: `tag-${tag}`,
        x: 250 + (i - 1) * 150,
        y: 150,
        vx: 0,
        vy: 0,
        mass: 5,
        radius: 24,
        type: 'tag',
        label: tag,
      });
    });

    items.forEach((item, i) => {
      const angle = (i * 2 * Math.PI) / items.length;
      nodes.push({
        id: `item-${item.id}`,
        x: 250 + Math.cos(angle) * 200,
        y: 150 + Math.sin(angle) * 200,
        vx: 0,
        vy: 0,
        mass: 2,
        radius: 15,
        type: 'item',
        label: item.name,
        tag: item.tag,
      });
    });

    return nodes;
  };

  const initializeLinks = () => {
    return items.map(item => ({
      source: nodesRef.current.find(n => n.id === `item-${item.id}`),
      target: nodesRef.current.find(n => n.id === `tag-${item.tag}`),
      strength: 0.5
    }));
  };

  const applyPhysics = () => {
    if (!draggedNodeRef.current) return;

    const nodes = nodesRef.current;
    const links = linksRef.current;

    const connectedNodes = new Set();
    links.forEach(link => {
      if (link.source === draggedNodeRef.current) {
        connectedNodes.add(link.target);
      } else if (link.target === draggedNodeRef.current) {
        connectedNodes.add(link.source);
      }
    });

    connectedNodes.forEach(node => {
      const dx = draggedNodeRef.current.x - node.x;
      const dy = draggedNodeRef.current.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const targetDistance = 150;
        const strength = 0.05;
        
        node.vx += (dx - (dx / distance) * targetDistance) * strength;
        node.vy += (dy - (dy / distance) * targetDistance) * strength;
        
        node.vx *= 0.7;
        node.vy *= 0.7;
        
        node.x += node.vx;
        node.y += node.vy;

        node.x = Math.max(50, Math.min(450, node.x));
        node.y = Math.max(50, Math.min(250, node.y));
      }
    });
  };

  useEffect(() => {
    const fetchCryptoPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setCryptoPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching crypto price:', error);
        setCryptoPrice('N/A');
      }
    };

    fetchCryptoPrice();
    const interval = setInterval(fetchCryptoPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw links (remains the same)
    linksRef.current.forEach(link => {
      ctx.beginPath();
      ctx.moveTo(link.source.x, link.source.y);
      ctx.lineTo(link.target.x, link.target.y);
      ctx.strokeStyle = selectedTag ? 
        (link.target.label === selectedTag ? '#97FCE4' : '#4B5563') : 
        '#97FCE4';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw nodes
    nodesRef.current.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      
      if (node.type === 'tag') {
        // For tags, keep the original behavior
        ctx.fillStyle = selectedTag === node.label ? '#97FCE4' : '#60A5FA';
        ctx.fill();
        ctx.fillStyle = '#1F2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px sans-serif';
        ctx.fillText(node.label, node.x, node.y);
      } else {
        // For items, draw white background and logo
        ctx.fillStyle = selectedTag ? 
          (node.tag === selectedTag ? '#97FCE4' : '#4B5563') : 
          '#60A5FA';
        ctx.fill();
        
        // Draw logo
        const item = items.find(i => `item-${i.id}` === node.id);
        if (item && projectImages.current[item.id]) {
          const img = projectImages.current[item.id];
          const imgSize = node.radius * 2; // Adjust size as needed
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius - 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(
            img,
            node.x - imgSize/2,
            node.y - imgSize/2,
            imgSize,
            imgSize
          );
          ctx.restore();
        }
      }
    });
  };
 
  const startSimulation = () => {
    const animate = () => {
      applyPhysics();
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = scaleRef.current;
    const x = (e.clientX - rect.left) * scale;
    const y = (e.clientY - rect.top) * scale;

    nodesRef.current.forEach(node => {
      const dx = x - node.x;
      const dy = y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.radius) {
        draggedNodeRef.current = node;
        if (node.type === 'tag') {
          setSelectedTag(selectedTag === node.label ? null : node.label);
        }
      }
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedNodeRef.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scale = scaleRef.current;
    draggedNodeRef.current.x = (e.clientX - rect.left) * scale;
    draggedNodeRef.current.y = (e.clientY - rect.top) * scale;
    
    draggedNodeRef.current.x = Math.max(50, Math.min(450, draggedNodeRef.current.x));
    draggedNodeRef.current.y = Math.max(50, Math.min(250, draggedNodeRef.current.y));
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    nodesRef.current = initializeNodes();
    linksRef.current = initializeLinks();
    
    const updateScale = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        scaleRef.current = canvas.width / rect.width;
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    startSimulation();

    return () => {
      window.removeEventListener('resize', updateScale);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-[#97FCE4] p-4 shadow-lg flex justify-between items-center">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <span className="text-gray-900 font-bold text-xl">onHL</span>
        </div>
        {cryptoPrice && (
          <div className="text-gray-900 font-medium">
            Ethereum: ${cryptoPrice.toFixed(2)}
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-8 flex-grow">
        <canvas 
          ref={canvasRef}
          width={500}
          height={300}
          className="w-full bg-gray-800 rounded-lg shadow-xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Directory</h1>
          <select 
            className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white hover:border-[#97FCE4] transition-colors"
            onChange={(e) => setSelectedTag(e.target.value || null)}
            value={selectedTag || ''}
          >
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {items
            .filter(item => !selectedTag || item.tag === selectedTag)
            .map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={item.logo} alt={`${item.name} logo`} className="w-6 h-6 rounded-full bg-white p-0.5" onError={(e) => { e.target.src = '/api/placeholder/24/24'; }} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-[#97FCE4] text-gray-900 rounded-full text-sm font-medium">
                    {item.tag}
                  </span>
                  <a href={item.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#97FCE4] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
        </div>

        <div className="border border-gray-700 rounded-lg p-4 space-y-4 bg-gray-800 shadow-xl">
          <h2 className="text-xl font-bold">Articles</h2>
          <div className="space-y-2">
            {articles.map((article, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
              >
                <div className="flex-grow">
                  <div className="font-medium">{article.title}</div>
                  <div className="text-sm text-gray-400">{article.month} {article.year}</div>
                </div>
                <a 
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#97FCE4] transition-colors ml-4"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-[#97FCE4] p-4 mt-auto shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <span className="text-gray-900 font-bold text-xl">onHL</span>
        </div>
      </footer>
    </div>
  );
}; // DirectoryApp component closing

export default DirectoryApp;