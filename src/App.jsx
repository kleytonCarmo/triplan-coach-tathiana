import React, { useState } from "react";

const treinos = [
  {
    dia: "Segunda",
    tipo: "Bike",
    treino: "Bike 45 a 60 minutos em Z2",
    objetivo: "Construir base aeróbica com pedal confortável.",
    checklist: ["Aquecimento leve", "Manter ritmo constante", "Registrar no Garmin", "Alongar quadril e lombar"]
  },
  {
    dia: "Terça",
    tipo: "Musculação",
    treino: "Full body + core",
    objetivo: "Fortalecer pernas, glúteos, core e prevenir lesões.",
    checklist: ["Agachamento", "Stiff", "Remada", "Prancha", "Ponte de glúteo"]
  },
  {
    dia: "Quarta",
    tipo: "Bike + Natação",
    treino: "Bike leve + natação técnica",
    objetivo: "Melhorar resistência e adaptação respiratória.",
    checklist: ["Bike Z2", "Tiros leves", "Flutuação", "Respiração bilateral"]
  },
  {
    dia: "Quinta",
    tipo: "Musculação",
    treino: "Força funcional",
    objetivo: "Estabilidade, prevenção e controle corporal.",
    checklist: ["Core", "Quadril", "Posterior", "Mobilidade"]
  },
  {
    dia: "Sexta",
    tipo: "Natação",
    treino: "Natação técnica",
    objetivo: "Ganhar confiança na água sem ansiedade.",
    checklist: ["Aquecimento", "Educativos", "Respiração", "Nado contínuo leve"]
  },
  {
    dia: "Sábado",
    tipo: "Corrida",
    treino: "Corrida confortável",
    objetivo: "Manter base de corrida sem sobrecarga.",
    checklist: ["Começar leve", "Controlar respiração", "Finalizar inteira", "Alongar"]
  },
  {
    dia: "Domingo",
    tipo: "Recuperação",
    treino: "Descanso + mobilidade",
    objetivo: "Recuperar para a próxima semana.",
    checklist: ["Hidratação", "Sono", "Mobilidade leve", "Caminhada opcional"]
  }
];

export default function App() {
  const [selecionado, setSelecionado] = useState(treinos[0]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#111827",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto"
      }}>
        <header style={{
          background: "linear-gradient(135deg, #020617, #1e293b)",
          color: "white",
          padding: "30px",
          borderRadius: "24px",
          marginBottom: "20px"
        }}>
          <p style={{ color: "#38bdf8", fontWeight: "bold", letterSpacing: "2px" }}>
            TRIPLAN COACH
          </p>
          <h1 style={{ fontSize: "34px", margin: "10px 0" }}>
            Preparação Tathiana Maia
          </h1>
          <p style={{ fontSize: "18px", color: "#cbd5e1" }}>
            Jornada até o Short Triathlon Brasília — 15 de agosto de 2026
          </p>
          <p style={{ marginTop: "15px", color: "#e2e8f0" }}>
            Objetivo: completar a prova com segurança, consistência e boa experiência.
          </p>
        </header>

        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginBottom: "20px"
        }}>
          <Card titulo="Prova" valor="15/08/2026" />
          <Card titulo="Meta" valor="Concluir bem" />
          <Card titulo="Treinos" valor="45–60 min" />
          <Card titulo="Foco" valor="Consistência" />
        </section>

        <main style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          <section>
            <h2 style={{ color: "white" }}>Planner semanal</h2>

            {treinos.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelecionado(item)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: selecionado.dia === item.dia ? "#e0f2fe" : "white",
                  border: "none",
                  borderRadius: "18px",
                  padding: "18px",
                  marginBottom: "12px",
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                }}
              >
                <strong>{item.dia} — {item.tipo}</strong>
                <p style={{ margin: "8px 0 0", color: "#475569" }}>{item.treino}</p>
              </button>
            ))}
          </section>

          <section style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
          }}>
            <p style={{ color: "#64748b", fontWeight: "bold" }}>
              TREINO SELECIONADO
            </p>
            <h2>{selecionado.dia} — {selecionado.tipo}</h2>
            <h3>{selecionado.treino}</h3>
            <p style={{ color: "#475569" }}>{selecionado.objetivo}</p>

            <h3>Checklist do treino</h3>
            {selecionado.checklist.map((item, index) => (
              <label key={index} style={{
                display: "block",
                background: "#f1f5f9",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "10px"
              }}>
                <input type="checkbox" style={{ marginRight: "10px" }} />
                {item}
              </label>
            ))}

            <h3>Check-in diário</h3>

            <label>Energia</label>
            <select style={campo}>
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>

            <label>Sono</label>
            <select style={campo}>
              <option>Ruim</option>
              <option>Médio</option>
              <option>Bom</option>
            </select>

            <label>Observações</label>
            <textarea
              placeholder="Como se sentiu hoje? Alguma dor, fadiga ou dificuldade?"
              style={{ ...campo, height: "100px" }}
            />

            <button style={{
              width: "100%",
              background: "#020617",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "14px",
              fontWeight: "bold",
              marginTop: "10px"
            }}>
              Registrar feedback
            </button>
          </section>
        </main>

        <footer style={{
          color: "#cbd5e1",
          textAlign: "center",
          marginTop: "30px",
          padding: "20px"
        }}>
          Consistência silenciosa constrói provas fortes.
        </footer>
      </div>
    </div>
  );
}

function Card({ titulo, valor }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "18px",
      padding: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
    }}>
      <p style={{ color: "#64748b", margin: 0 }}>{titulo}</p>
      <strong style={{ fontSize: "20px" }}>{valor}</strong>
    </div>
  );
}

const campo = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  margin: "8px 0 15px"
};
