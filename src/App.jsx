import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Bike, Waves, Dumbbell, Footprints, HeartPulse, Moon, Droplets, Plane, Trophy, MessageCircle, ChevronRight } from "lucide-react";

const trainingPlan = [
  {
    week: "Semana 1",
    phase: "Base e adaptação",
    days: [
      { day: "Segunda", date: "12/05", type: "Bike", icon: Bike, color: "bg-blue-500", title: "Bike 45min Z2", goal: "Pedal confortável, cadência leve e sem oscilar o ritmo.", checklist: ["Aquecimento leve", "Manter Z2", "Registrar no Garmin", "Alongar quadril e lombar"] },
      { day: "Terça", date: "13/05", type: "Musculação", icon: Dumbbell, color: "bg-amber-500", title: "Full Body + Core", goal: "Ativar glúteos, posterior, core e estabilidade geral.", checklist: ["Agachamento leve", "Stiff", "Remada", "Prancha", "Ponte de glúteo"] },
      { day: "Quarta", date: "14/05", type: "Bike + Natação", icon: Waves, color: "bg-cyan-500", title: "Bike 40min + Natação 30min", goal: "Bike leve com 4 estímulos curtos e natação técnica respiratória.", checklist: ["Bike Z2", "4x 1min forte / 2min leve", "Flutuação", "Respiração bilateral"] },
      { day: "Quinta", date: "15/05", type: "Musculação", icon: Dumbbell, color: "bg-amber-500", title: "Funcional + Estabilidade", goal: "Fortalecer quadril, lombar e prevenir lesões.", checklist: ["Mobilidade de quadril", "Core anti-rotação", "Estabilidade unilateral", "Alongamento final"] },
      { day: "Sexta", date: "16/05", type: "Natação", icon: Waves, color: "bg-cyan-500", title: "Natação 35min", goal: "Nadar sem ansiedade, focando respiração e técnica.", checklist: ["Aquecimento leve", "Educativos", "Respiração bilateral", "Soltar ao final"] },
      { day: "Sábado", date: "17/05", type: "Corrida", icon: Footprints, color: "bg-green-500", title: "Corrida 6km Z2", goal: "Ritmo confortável e controle respiratório.", checklist: ["Começar leve", "Manter Z2", "Finalizar inteiro", "Mobilidade pós-treino"] },
      { day: "Domingo", date: "18/05", type: "Recuperação", icon: HeartPulse, color: "bg-purple-500", title: "Descanso + Mobilidade", goal: "Absorver os treinos e recuperar para a próxima semana.", checklist: ["Caminhada leve opcional", "Mobilidade 10min", "Hidratação", "Sono de qualidade"] },
    ],
  },
  {
    week: "Semana da Viagem",
    phase: "Recuperação ativa controlada",
    days: [
      { day: "21/06 a 28/06", date: "Viagem", type: "Moto", icon: Plane, color: "bg-rose-500", title: "Protocolo especial de viagem", goal: "Preservar condicionamento, reduzir rigidez e evitar fadiga acumulada.", checklist: ["Caminhada 20–40min", "Mobilidade quadril/lombar", "Hidratação reforçada", "Pausas durante pilotagem", "Corrida leve 5km se estiver descansada"] },
    ],
  },
  {
    week: "Semana da Prova",
    phase: "Polimento final",
    days: [
      { day: "Segunda", date: "10/08", type: "Bike", icon: Bike, color: "bg-blue-500", title: "Bike leve 40min", goal: "Ativar sem gerar fadiga.", checklist: ["Z1/Z2", "Sem tiro forte", "Garmin carregado", "Alongamento leve"] },
      { day: "Terça", date: "11/08", type: "Musculação", icon: Dumbbell, color: "bg-amber-500", title: "Mobilidade + ativação", goal: "Manter o corpo acordado, sem carga pesada.", checklist: ["Core leve", "Glúteo leve", "Mobilidade", "Nada de exaustão"] },
      { day: "Quarta", date: "12/08", type: "Natação", icon: Waves, color: "bg-cyan-500", title: "Natação técnica leve", goal: "Confiança na água e controle emocional.", checklist: ["Respiração", "Técnica", "Ritmo fácil", "Sair querendo mais"] },
      { day: "Quinta", date: "13/08", type: "Descanso ativo", icon: HeartPulse, color: "bg-purple-500", title: "Descanso ativo", goal: "Reduzir tensão e preservar energia.", checklist: ["Caminhada leve", "Hidratação", "Sono", "Sem treino intenso"] },
      { day: "Sexta", date: "14/08", type: "Ativação", icon: Footprints, color: "bg-green-500", title: "Ativação 20min", goal: "Acordar o corpo, sem cansar.", checklist: ["10min leve", "3 acelerações curtas", "Alongar", "Organizar equipamentos"] },
      { day: "Sábado", date: "15/08", type: "Prova", icon: Trophy, color: "bg-yellow-500", title: "Short Triathlon Brasília", goal: "Completar forte, consciente e sem quebrar.", checklist: ["Natação controlada", "Bike constante", "Corrida progressiva", "Aproveitar a experiência"] },
    ],
  },
];

const allDays = trainingPlan.flatMap((w) => w.days.map((d) => ({ ...d, week: w.week, phase: w.phase })));

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-slate-900 p-2 text-white"><Icon size={18} /></div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
          <p className="text-lg font-bold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

function DayCard({ item, onOpen }) {
  const Icon = item.icon;
  return (
    <button onClick={() => onOpen(item)} className="w-full text-left rounded-3xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`h-11 w-11 rounded-2xl ${item.color} text-white flex items-center justify-center`}><Icon size={22} /></div>
          <div>
            <p className="text-xs text-slate-500">{item.day} • {item.date}</p>
            <h3 className="font-bold text-slate-900">{item.title}</h3>
          </div>
        </div>
        <ChevronRight className="text-slate-300" />
      </div>
      <p className="mt-3 text-sm text-slate-600">{item.goal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item.type}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item.phase}</span>
      </div>
    </button>
  );
}

export default function TriPlanCoachApp() {
  const [selected, setSelected] = useState(allDays[0]);
  const [checked, setChecked] = useState({});
  const [energy, setEnergy] = useState("Média");
  const [sleep, setSleep] = useState("Boa");
  const [notes, setNotes] = useState("");

  const completed = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-100 to-white text-slate-900">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl">
          <div className="grid md:grid-cols-[1.1fr_.9fr] gap-6 p-6 md:p-10">
            <div>
              <p className="text-sm text-cyan-300 font-semibold uppercase tracking-[0.2em]">TriPlan Coach</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight">Tathiana Maia: jornada até o Short Triathlon</h1>
              <p className="mt-4 max-w-2xl text-slate-300">Planner digital simples para acompanhar treinos, check-ins e evolução até a prova de Brasília em 15 de agosto de 2026.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Objetivo: terminar forte</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">45–60min por treino</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Garmin 165</span>
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur border border-white/10">
              <p className="text-sm text-slate-300">Treino selecionado</p>
              <h2 className="mt-2 text-2xl font-bold">{selected.title}</h2>
              <p className="mt-2 text-slate-300">{selected.goal}</p>
              <button className="mt-5 w-full rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">Ver checklist do treino</button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard icon={CalendarDays} label="Prova" value="15/08/2026" hint="Brasília • Short Triathlon" />
          <StatCard icon={CheckCircle2} label="Checks" value={`${completed}`} hint="Itens concluídos nesta simulação" />
          <StatCard icon={HeartPulse} label="Foco" value="Z1/Z2" hint="Base aeróbica e controle de fadiga" />
          <StatCard icon={Trophy} label="Meta" value="Concluir bem" hint="Sem quebrar e com boa experiência" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.85fr]">
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-black">Planner de treinos</h2>
                <p className="text-slate-500">Toque em um treino para ver detalhes e marcar o check.</p>
              </div>
            </div>
            <div className="grid gap-4">
              {allDays.map((item, idx) => <DayCard key={idx} item={item} onOpen={setSelected} />)}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-slate-100 sticky top-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-2xl ${selected.color} text-white flex items-center justify-center`}><selected.icon size={24} /></div>
                <div>
                  <p className="text-xs text-slate-500">{selected.week} • {selected.day}</p>
                  <h2 className="text-xl font-black">{selected.title}</h2>
                </div>
              </div>
              <p className="mt-4 text-slate-600">{selected.goal}</p>

              <div className="mt-5 space-y-3">
                {selected.checklist.map((c, i) => {
                  const key = `${selected.title}-${i}`;
                  return (
                    <label key={key} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 cursor-pointer">
                      <input type="checkbox" checked={!!checked[key]} onChange={(e) => setChecked({ ...checked, [key]: e.target.checked })} className="h-5 w-5 accent-cyan-500" />
                      <span className="text-sm font-medium text-slate-700">{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black">Check-in diário</h3>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <label className="flex items-center gap-2 text-sm font-bold"><HeartPulse size={16}/> Energia</label>
                  <select value={energy} onChange={(e) => setEnergy(e.target.value)} className="mt-2 w-full rounded-xl border-0 bg-white p-3 text-sm">
                    <option>Baixa</option><option>Média</option><option>Alta</option>
                  </select>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <label className="flex items-center gap-2 text-sm font-bold"><Moon size={16}/> Sono</label>
                  <select value={sleep} onChange={(e) => setSleep(e.target.value)} className="mt-2 w-full rounded-xl border-0 bg-white p-3 text-sm">
                    <option>Ruim</option><option>Médio</option><option>Boa</option>
                  </select>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <label className="flex items-center gap-2 text-sm font-bold"><Droplets size={16}/> Observações</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Como se sentiu hoje? Dor, fadiga, confiança na água, Garmin..." className="mt-2 min-h-28 w-full rounded-xl border-0 bg-white p-3 text-sm" />
                </div>
                <button className="rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white flex items-center justify-center gap-2"><MessageCircle size={18}/> Enviar feedback ao coach</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
