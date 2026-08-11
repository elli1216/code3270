import { createFileRoute, Link } from '@tanstack/react-router'
import { Trophy, ArrowLeft, Star, Target, Zap, ShieldCheck } from 'lucide-react'
import { useProgressStore } from '../store/progressStore'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/leaderboard')({
  component: LeaderboardPage,
})

const MOCK_LEADERBOARD: { rank: number; name: string; xp: number; level: number; isUser?: boolean }[] = [
  { rank: 1, name: "Grace Hopper", xp: 14500, level: 30 },
  { rank: 2, name: "Jean Sammet", xp: 12200, level: 25 },
  { rank: 3, name: "MainframeKing99", xp: 8400, level: 17 },
  { rank: 4, name: "COBOL_Wizard", xp: 5100, level: 11 },
  { rank: 5, name: "JCL_Master", xp: 3200, level: 7 },
  { rank: 6, name: "CICS_Pro", xp: 2100, level: 5 },
]

function LeaderboardPage() {
  const { xp } = useProgressStore()
  const safeXp = xp || 0
  const userLevel = Math.floor(safeXp / 500) + 1

  // Insert current user into leaderboard
  const combinedLeaderboard = [...MOCK_LEADERBOARD]
  const userEntry = { rank: 0, name: "You (Developer)", xp: safeXp, level: userLevel, isUser: true }

  // Sort and re-rank
  combinedLeaderboard.push(userEntry)
  combinedLeaderboard.sort((a, b) => b.xp - a.xp)
  combinedLeaderboard.forEach((entry, index) => {
    entry.rank = index + 1
  })

  return (
    <div className="min-h-screen bg-[#0a0f12] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0f12]/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
            <ArrowLeft size={18} />
            <span className="font-semibold text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 font-mono font-bold text-lg text-emerald-400">
            <Trophy size={20} />
            <span>GLOBAL RANKING</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* User Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full bg-[#0a0f12] border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Star size={32} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Your Profile</h2>
              <div className="flex gap-4 font-mono text-sm">
                <span className="text-emerald-400 font-bold">LEVEL {userLevel}</span>
                <span className="text-slate-400">{safeXp} Total XP</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 relative z-10 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-[#0a0f12] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px]">
              <Target size={20} className="text-emerald-500 mb-2" />
              <span className="text-2xl font-bold text-white font-mono">{userEntry.rank}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Global Rank</span>
            </div>
            <div className="flex-1 md:flex-none bg-[#0a0f12] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px]">
              <ShieldCheck size={20} className="text-emerald-500 mb-2" />
              <span className="text-2xl font-bold text-white font-mono">{userLevel}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Current Level</span>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Table */}
        <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
          <Zap size={20} className="text-emerald-500" />
          Top Engineers
        </h3>

        <div className="flex flex-col gap-3">
          {combinedLeaderboard.map((entry, idx) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${entry.isUser
                ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-[1.02]'
                : 'bg-slate-900/30 border-slate-800 hover:bg-slate-900/50'
                }`}
            >
              <div className="flex items-center gap-6">
                <div className={`font-mono text-xl font-bold w-8 text-center ${entry.rank === 1 ? 'text-yellow-400' :
                  entry.rank === 2 ? 'text-slate-300' :
                    entry.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                  }`}>
                  #{entry.rank}
                </div>
                <div className="flex flex-col">
                  <span className={`font-bold ${entry.isUser ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {entry.name}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Level {entry.level}</span>
                </div>
              </div>
              <div className={`font-mono font-bold ${entry.isUser ? 'text-emerald-400' : 'text-slate-400'}`}>
                {entry.xp.toLocaleString()} XP
              </div>
            </motion.div >
          ))
          }
        </div >
      </main >
    </div >
  )
}
