import { motion } from 'framer-motion'
import { History, Cpu, Network, ShieldCheck, ArrowRight, Anchor } from 'lucide-react'
import { MAINFRAME_HISTORY_INTRO, MAINFRAME_TIMELINE, MAINFRAME_HISTORY_OUTRO } from '../../data/history'

export function HistorySection() {
  return (
    <section className="w-full mt-32 relative z-10">
      <div className="absolute inset-0 bg-slate-900/40 rounded-3xl border border-slate-800/80 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/50 mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <History size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            {MAINFRAME_HISTORY_INTRO.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            {MAINFRAME_HISTORY_INTRO.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-24">
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent md:-translate-x-1/2" />
          
          {MAINFRAME_TIMELINE.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex items-center mb-12 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
            >
              {/* Center Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500/20 border-2 border-emerald-500 -translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.4)] z-10" />
              
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12 flex flex-col">
                <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
                  <span className="text-emerald-400 font-mono font-bold text-lg mb-2 flex items-center gap-2">
                    {idx % 2 !== 0 && <ArrowRight size={16} className="hidden md:block text-emerald-500/50" />}
                    {event.year}
                    {idx % 2 === 0 && <ArrowRight size={16} className="hidden md:block text-emerald-500/50 rotate-180" />}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{event.title}</h3>
                  <div className="bg-slate-800/30 rounded-2xl border border-slate-700/30 backdrop-blur-sm overflow-hidden flex flex-col w-full shadow-lg shadow-black/20 group-hover:border-slate-600/50 transition-colors">
                    {event.image && (
                      <div className="relative w-full h-48 sm:h-56 bg-slate-900 border-b border-slate-700/50 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" 
                        />
                        {event.source && (
                          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-medium text-slate-400 border border-white/5">
                            Source: {event.source}
                          </div>
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                      </div>
                    )}
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed p-5">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{MAINFRAME_HISTORY_OUTRO.title}</h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{MAINFRAME_HISTORY_OUTRO.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {MAINFRAME_HISTORY_OUTRO.points.map((point, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
                <div className="shrink-0 mt-1">
                  {idx === 0 ? <ShieldCheck className="text-emerald-400" size={24} /> :
                   idx === 1 ? <Cpu className="text-emerald-400" size={24} /> :
                   idx === 2 ? <Anchor className="text-emerald-400" size={24} /> :
                               <Network className="text-emerald-400" size={24} />}
                </div>
                <div>
                  <h4 className="text-slate-200 font-bold mb-2">{point.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-6 bg-emerald-900/10 rounded-2xl border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
            <p className="text-emerald-100/80 text-base md:text-lg relative z-10 leading-relaxed font-light">
              {MAINFRAME_HISTORY_OUTRO.conclusion}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
