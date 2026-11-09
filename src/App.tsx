import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Dumbbell, Activity, TrendingUp, Heart, User, Play, Pause, Check, Clock,
  RotateCcw, ChevronRight, ChevronLeft, Award, Flame, Droplets,
  Moon, Footprints, Utensils, AlertCircle, Sparkles, ArrowUpRight,
  Calendar, Camera, FileText, Download, RefreshCw, Eye, ShieldAlert,
  Sliders, CheckCircle2, Info, X, Plus, Minus, Zap, Maximize2, Minimize2,
  BookOpen, Repeat, Trash2, UserPlus, Ruler, Scale, Calculator, Save,
  Upload
} from 'lucide-react';

const STORAGE_KEY = 'full-body-3x-state';

// ==========================================
// Estado inicial sem dados pessoais ou registros demonstrativos.
// ==========================================
const DEFAULT_USER_PROFILE = {
  name: '',
  age: '',
  sex: '',
  experience: '',
  mainGoal: '',
  initialWeight: '',
  currentWeight: '',
  goalWeight: '',
  height: '',
  heightCm: '',
  weeklyTarget: 3,
  weeklyCompleted: 0,
  initialWaist: '',
  currentWaist: '',
  neck: '',
  hip: '',
  chest: '',
  shoulder: '',
  armRelaxedRight: '',
  armRelaxedLeft: '',
  armContractedRight: '',
  armContractedLeft: '',
  forearmRight: '',
  forearmLeft: '',
  thighRight: '',
  thighLeft: '',
  calfRight: '',
  calfLeft: '',
  manualBodyFat: ''
};

const createEmptySets = count => Array.from({ length: count }, (_, index) => ({
  setNumber: index + 1,
  weight: 0,
  reps: 0,
  rir: '1-2',
  completed: false
}));

const INITIAL_WORKOUTS = {
  A: {
    id: 'A',
    name: 'TREINO A',
    day: 'Sessão A',
    emphasis: 'Força técnica e hipertrofia',
    duration: '45–60 min',
    organizationTip: 'Para ganhar tempo, alterne Supino Reto e Puxada Alta, descansando após cada par. Faça o Stiff com coluna neutra e amplitude confortável.',
    exercises: [
      {
        id: 'a1',
        name: 'Leg press 45°',
        originalName: 'Leg press 45°',
        muscle: 'Quadríceps & Glúteos',
        targetSets: 3,
        targetReps: '8–10',
        maxRepTarget: 10,
        restSeconds: 90,
        restLabel: '90–120 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Leg press 45°', 'Agachamento Livre', 'Hack Machine'],
        instructions: 'Posicione os pés na largura dos ombros no meio da plataforma. Desça controlando até ~90 graus de flexão dos joelhos sem tirar o quadril do banco.',
        sets: createEmptySets(3)
      },
      {
        id: 'a2',
        name: 'Supino reto (barra ou máquina)',
        originalName: 'Supino reto (barra ou máquina)',
        muscle: 'Peitoral Maior',
        pairWith: 'Alterne com Puxada Alta',
        targetSets: 3,
        targetReps: '8–10',
        maxRepTarget: 10,
        restSeconds: 90,
        restLabel: '90–120 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2,
        substitutions: ['Supino reto (barra ou máquina)', 'Supino com Halteres', 'Supino Máquina Articulada'],
        instructions: 'Mantenha as escápulas retraídas e pés firmes no chão. Desça a barra de forma controlada até tocar levemente a linha inferior do peitoral.',
        sets: createEmptySets(3)
      },
      {
        id: 'a3',
        name: 'Puxada alta (pulley)',
        originalName: 'Puxada alta (pulley)',
        muscle: 'Dorsais',
        pairWith: 'Alterne com Supino Reto',
        targetSets: 3,
        targetReps: '8–12',
        maxRepTarget: 12,
        restSeconds: 80,
        restLabel: '75–90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Puxada alta (pulley)', 'Barra Fixa no Graviton', 'Puxada com Triângulo'],
        instructions: 'Inicie o movimento deprimindo as escápulas e puxe a barra em direção à parte superior do peito, evitando balançar excessivamente o tronco.',
        sets: createEmptySets(3)
      },
      {
        id: 'a4',
        name: 'Stiff com halteres',
        originalName: 'Stiff com halteres',
        muscle: 'Posteriores de Coxa & Glúteos',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 90,
        restLabel: '90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2,
        substitutions: ['Stiff com halteres', 'Stiff com Barra', 'Mesa Flexora'],
        instructions: 'Coluna 100% neutra! Empurre o quadril para trás mantendo joelhos levemente destravados até sentir o alongamento dos posteriores.',
        sets: createEmptySets(2)
      },
      {
        id: 'a5',
        name: 'Elevação lateral',
        originalName: 'Elevação lateral',
        muscle: 'Deltoide Lateral',
        targetSets: 2,
        targetReps: '12–15',
        maxRepTarget: 15,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 1,
        substitutions: ['Elevação lateral', 'Elevação Lateral na Polia', 'Elevação Lateral Máquina'],
        instructions: 'Eleve os halteres lateralmente com leve inclinação do tronco à frente até a altura dos ombros. Controle a descida.',
        sets: createEmptySets(2)
      },
      {
        id: 'a6',
        name: 'Rosca direta',
        originalName: 'Rosca direta',
        muscle: 'Bíceps',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2,
        substitutions: ['Rosca direta', 'Rosca Barra W', 'Rosca com Halteres'],
        instructions: 'Cotovelos fixos ao lado do tronco. Suba contraindo o bíceps e desça em 2 segundos sem soltar o peso.',
        sets: createEmptySets(2)
      },
      {
        id: 'a7',
        name: 'Tríceps corda',
        originalName: 'Tríceps corda',
        muscle: 'Tríceps',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Tríceps corda', 'Tríceps Barra Reta', 'Tríceps Testa'],
        instructions: 'Estenda os cotovelos completamente abrindo levemente a corda no final do movimento para máxima contração.',
        sets: createEmptySets(2)
      },
      {
        id: 'a8',
        name: 'Prancha abdominal',
        originalName: 'Prancha abdominal',
        muscle: 'Core / Abdômen',
        targetSets: 2,
        targetReps: '30–45 s',
        maxRepTarget: 45,
        restSeconds: 45,
        restLabel: '30–45 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Prancha abdominal', 'Abdominal Supra no Solo', 'Abdominal Infra'],
        instructions: 'Mantenha o corpo alinhado dos tornozelos aos ombros, contraindo abdômen e glúteos sem deixar a lombar afundar.',
        sets: createEmptySets(2)
      }
    ]
  },
  B: {
    id: 'B',
    name: 'TREINO B',
    day: 'Sessão B',
    emphasis: 'Hipertrofia com variação de movimentos',
    duration: '45–60 min',
    organizationTip: 'Alterne Supino Inclinado e Remada Baixa. Controle a descida e evite encurtar o movimento para aumentar a carga.',
    exercises: [
      {
        id: 'b1',
        name: 'Agachamento no hack',
        originalName: 'Agachamento no hack',
        muscle: 'Quadríceps',
        targetSets: 3,
        targetReps: '8–12',
        maxRepTarget: 12,
        restSeconds: 105,
        restLabel: '90–120 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Agachamento no hack', 'Leg Press 45°', 'Agachamento Guiado (Smith)'],
        instructions: 'Apoie bem toda a coluna no encosto. Desça de forma controlada sem tirar os calcanhares da plataforma.',
        sets: createEmptySets(3)
      },
      {
        id: 'b2',
        name: 'Supino inclinado com halteres',
        originalName: 'Supino inclinado com halteres',
        muscle: 'Peitoral Superior',
        pairWith: 'Alterne com Remada Baixa',
        targetSets: 3,
        targetReps: '8–12',
        maxRepTarget: 12,
        restSeconds: 90,
        restLabel: '90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2,
        substitutions: ['Supino inclinado com halteres', 'Supino Inclinado Máquina', 'Supino Inclinado Barra'],
        instructions: 'Banco a 30°–45°. Desça os halteres alongando bem o peitoral com cotovelos levemente fechados (45°).',
        sets: createEmptySets(3)
      },
      {
        id: 'b3',
        name: 'Remada baixa no cabo',
        originalName: 'Remada baixa no cabo',
        muscle: 'Costas / Espessura',
        pairWith: 'Alterne com Supino Inclinado',
        targetSets: 3,
        targetReps: '8–12',
        maxRepTarget: 12,
        restSeconds: 80,
        restLabel: '75–90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Remada baixa no cabo', 'Remada Cavalinho', 'Remada Unilateral com Halter (Serrote)'],
        instructions: 'Traga o puxador em direção ao abdômen abrindo o peito e espremendo as escápulas no final.',
        sets: createEmptySets(3)
      },
      {
        id: 'b4',
        name: 'Mesa flexora',
        originalName: 'Mesa flexora',
        muscle: 'Isquiotibiais (Posteriores)',
        targetSets: 2,
        targetReps: '10–15',
        maxRepTarget: 15,
        restSeconds: 70,
        restLabel: '60–75 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Mesa flexora', 'Cadeira Flexora', 'Flexora Vertical'],
        instructions: 'Mantenha o quadril pressionado contra o banco durante toda a flexão dos joelhos.',
        sets: createEmptySets(2)
      },
      {
        id: 'b5',
        name: 'Desenvolvimento na máquina',
        originalName: 'Desenvolvimento na máquina',
        muscle: 'Ombros (Deltoide Anterior/Lateral)',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 75,
        restLabel: '75 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Desenvolvimento na máquina', 'Desenvolvimento com Halteres', 'Arnold Press'],
        instructions: 'Empurre acima da cabeça sem arquear a lombar e controle o retorno até a linha do queixo/orelhas.',
        sets: createEmptySets(2)
      },
      {
        id: 'b6',
        name: 'Rosca Scott',
        originalName: 'Rosca Scott',
        muscle: 'Bíceps',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Rosca Scott', 'Rosca Concentrada', 'Rosca no Banco Inclinado'],
        instructions: 'Apoie totalmente os tríceps na almofada. Desça alongando bem sem relaxar a tensão na base.',
        sets: createEmptySets(2)
      },
      {
        id: 'b7',
        name: 'Tríceps na polia',
        originalName: 'Tríceps na polia',
        muscle: 'Tríceps',
        targetSets: 2,
        targetReps: '10–15',
        maxRepTarget: 15,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Tríceps na polia', 'Tríceps Corda', 'Mergulho na Máquina'],
        instructions: 'Mantenha cotovelos colados ao corpo e mova apenas os antebraços até estender totalmente.',
        sets: createEmptySets(2)
      },
      {
        id: 'b8',
        name: 'Abdominal na máquina',
        originalName: 'Abdominal na máquina',
        muscle: 'Reto Abdominal',
        targetSets: 2,
        targetReps: '12–15',
        maxRepTarget: 15,
        restSeconds: 45,
        restLabel: '30–45 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Abdominal na máquina', 'Abdominal na Polia (Crunch)', 'Prancha Abdominal'],
        instructions: 'Solte o ar enrolando a coluna (aproximando as costelas do quadril), focando na contração abdominal.',
        sets: createEmptySets(2)
      }
    ]
  },
  C: {
    id: 'C',
    name: 'TREINO C',
    day: 'Sessão C',
    emphasis: 'Estímulo geral, unilateralidade e estabilidade',
    duration: '45–60 min',
    organizationTip: 'Alterne Supino na Máquina e Remada Articulada. No Agachamento Búlgaro, comece com carga leve e priorize equilíbrio, controle e amplitude segura.',
    exercises: [
      {
        id: 'c1',
        name: 'Agachamento búlgaro',
        originalName: 'Agachamento búlgaro',
        muscle: 'Quadríceps & Glúteos (Unilateral)',
        targetSets: 2,
        targetReps: '8–10 por perna',
        maxRepTarget: 10,
        restSeconds: 90,
        restLabel: '90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2,
        substitutions: ['Agachamento búlgaro', 'Afundo com Halteres', 'Leg Press Unilateral'],
        instructions: 'Apoie o peito do pé de trás no banco. Desça flexionando o joelho da frente com leve inclinação do tronco.',
        sets: createEmptySets(2)
      },
      {
        id: 'c2',
        name: 'Supino na máquina',
        originalName: 'Supino na máquina',
        muscle: 'Peitoral',
        pairWith: 'Alterne com Remada Articulada',
        targetSets: 3,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 80,
        restLabel: '75–90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Supino na máquina', 'Supino Reto Barra', 'Peck Deck / Crucifixo Máquina'],
        instructions: 'Ajuste o banco para que as manoplas fiquem na linha média/baixa do peitoral. Controle o retorno.',
        sets: createEmptySets(3)
      },
      {
        id: 'c3',
        name: 'Remada articulada',
        originalName: 'Remada articulada',
        muscle: 'Dorsais / Costas',
        pairWith: 'Alterne com Supino Máquina',
        targetSets: 3,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 80,
        restLabel: '75–90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 4,
        substitutions: ['Remada articulada', 'Remada Curvada', 'Remada Baixa'],
        instructions: 'Peito apoiado no suporte da máquina. Puxe os braços para trás focando em juntar as escápulas.',
        sets: createEmptySets(3)
      },
      {
        id: 'c4',
        name: 'Elevação pélvica',
        originalName: 'Elevação pélvica',
        muscle: 'Glúteos & Posteriores',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 80,
        restLabel: '75–90 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Elevação pélvica', 'Elevação Pélvica na Máquina', 'Glúteo no Cabo'],
        instructions: 'Apoie a linha inferior das escápulas no banco. Suba o quadril até alinhar joelhos, quadril e ombros.',
        sets: createEmptySets(2)
      },
      {
        id: 'c5',
        name: 'Face pull',
        originalName: 'Face pull',
        muscle: 'Deltoide Posterior & Manguito',
        targetSets: 2,
        targetReps: '12–15',
        maxRepTarget: 15,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Face pull', 'Crucifixo Inverso Máquina', 'Crucifixo Inverso com Halteres'],
        instructions: 'Puxe a corda na direção da testa abrindo os cotovelos e rodando os punhos para trás.',
        sets: createEmptySets(2)
      },
      {
        id: 'c6',
        name: 'Rosca martelo',
        originalName: 'Rosca martelo',
        muscle: 'Braquial & Bíceps',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2,
        substitutions: ['Rosca martelo', 'Rosca Martelo na Polia com Corda', 'Rosca Alternada'],
        instructions: 'Mantenha as palmas das mãos voltadas uma para a outra durante todo o movimento.',
        sets: createEmptySets(2)
      },
      {
        id: 'c7',
        name: 'Tríceps francês na polia',
        originalName: 'Tríceps francês na polia',
        muscle: 'Tríceps (Cabeça Longa)',
        targetSets: 2,
        targetReps: '10–12',
        maxRepTarget: 12,
        restSeconds: 60,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 2.5,
        substitutions: ['Tríceps francês na polia', 'Tríceps Francês com Halter', 'Tríceps Testa'],
        instructions: 'De costas para a polia, estenda os cotovelos à frente/acima da cabeça mantendo os braços estáveis.',
        sets: createEmptySets(2)
      },
      {
        id: 'c8',
        name: 'Panturrilha na máquina',
        originalName: 'Panturrilha na máquina',
        muscle: 'Panturrilhas (Gastrocnêmio/Sóleo)',
        targetSets: 2,
        targetReps: '12–15',
        maxRepTarget: 15,
        restSeconds: 50,
        restLabel: '45–60 s',
        lastSummary: 'Sem histórico',
        lastWeight: 0,
        suggestedWeight: 0,
        progressionStatus: 'maintain',
        progressionNote: 'Registre suas séries para acompanhar a progressão.',
        increment: 5,
        substitutions: ['Panturrilha na máquina', 'Panturrilha no Leg Press', 'Panturrilha Sentado'],
        instructions: 'Amplitude total: desça alongando bem o calcanhar e suba na ponta dos pés contraindo forte.',
        sets: createEmptySets(2)
      }
    ]
  }
};

const INITIAL_BODY_HISTORY = [];

const INITIAL_SESSION_LOGS = [];
const DEFAULT_HABITS_DATE = '2026-11-08';

const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatHabitDate = date => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const INITIAL_HABITS = {
  waterMl: 0,
  waterGoalMl: 0,
  sleepHours: 0,
  sleepQuality: '',
  proteinGoalHit: false,
  calorieDeficitHit: false,
  steps: 0,
  stepsGoal: 8000,
  postWorkoutCardioDone: false,
  cardioType: ''
};

export default function App() {
  // ==========================================
  // ESTADOS GLOBAIS E PERSISTÊNCIA LOCAL
  // ==========================================
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState('connecting'); // 'connecting' | 'synced' | 'saving' | 'error'
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark'); // 'dark' | 'clean' | 'sport'
  const [appName, setAppName] = useState('FULL BODY 3X');

  const [userProfile, setUserProfile] = useState(DEFAULT_USER_PROFILE);
  const [workouts, setWorkouts] = useState(INITIAL_WORKOUTS);
  const [selectedWorkoutKey, setSelectedWorkoutKey] = useState('A');
  const [gymMode, setGymMode] = useState(false);
  const [focusedExerciseIndex, setFocusedExerciseIndex] = useState(0);
  const [warmupCompleted, setWarmupCompleted] = useState(false);
  const [sessionElapsedSeconds, setSessionElapsedSeconds] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);

  // Cronômetro de Descanso Automático
  const [restTimer, setRestTimer] = useState({
    active: false,
    secondsLeft: 90,
    totalSeconds: 90,
    exerciseName: 'Leg press 45°'
  });

  // Evolução e Avaliação
  const [bodyHistory, setBodyHistory] = useState(INITIAL_BODY_HISTORY);
  const [sessionLogs, setSessionLogs] = useState(INITIAL_SESSION_LOGS);
  const [evolutionSubTab, setEvolutionSubTab] = useState('recomp'); // 'recomp' | 'loads' | 'assessment' | 'calendar'
  const [selectedWorkoutSummaryDate, setSelectedWorkoutSummaryDate] = useState(getLocalDateKey());
  const [selectedExerciseFilter, setSelectedExerciseFilter] = useState('Leg press 45°');
  const [newAssessment, setNewAssessment] = useState({
    weight: '',
    waist: '',
    chest: '',
    arm: '',
    thigh: '',
    note: ''
  });

  // Hábitos Diários
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [selectedHabitDate, setSelectedHabitDate] = useState(DEFAULT_HABITS_DATE);
  const [habitCalendarMonth, setHabitCalendarMonth] = useState(DEFAULT_HABITS_DATE.slice(0, 7));
  const [habitHistory, setHabitHistory] = useState({});

  const updateHabits = updater => {
    const updatedHabits = typeof updater === 'function' ? updater(habits) : updater;
    setHabits(updatedHabits);
    setHabitHistory(prev => ({ ...prev, [selectedHabitDate]: updatedHabits }));
  };

  const selectHabitDate = date => {
    setSelectedHabitDate(date);
    setHabitCalendarMonth(date.slice(0, 7));
    setHabits(habitHistory[date] || INITIAL_HABITS);
  };

  const moveHabitCalendar = offset => {
    const [year, month] = habitCalendarMonth.split('-').map(Number);
    const nextMonth = new Date(year, month - 1 + offset, 1);
    setHabitCalendarMonth(`${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`);
  };

  const habitCalendarCells = useMemo(() => {
    const [year, month] = habitCalendarMonth.split('-').map(Number);
    const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month, 0).getDate();
    return [
      ...Array(firstWeekday).fill(null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
    ];
  }, [habitCalendarMonth]);

  const habitCalendarLabel = useMemo(() => {
    const [year, month] = habitCalendarMonth.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }, [habitCalendarMonth]);

  const habitCompletionCount = [
    habits.waterMl > 0,
    habits.steps > 0,
    habits.sleepHours > 0,
    habits.proteinGoalHit,
    habits.calorieDeficitHit,
    habits.postWorkoutCardioDone
  ].filter(Boolean).length;

  const selectedDayWorkoutLogs = sessionLogs.filter(log => log.dateISO === selectedWorkoutSummaryDate);
  const undatedWorkoutLogs = sessionLogs.filter(log => !log.dateISO);
  const selectedExerciseLogs = sessionLogs.flatMap(log => {
    const exercise = log.exercises?.find(item => item.name === selectedExerciseFilter);
    const completedSets = exercise?.sets.filter(set => set.completed) || [];
    return completedSets.length > 0 ? [{ ...log, exercise, completedSets }] : [];
  });
  const weekStartDate = new Date();
  weekStartDate.setDate(weekStartDate.getDate() - 6);
  const weekStartDateKey = getLocalDateKey(weekStartDate);
  const weeklyWorkoutVolume = sessionLogs
    .filter(log => log.dateISO && log.dateISO >= weekStartDateKey)
    .reduce((total, log) => total + (log.exercises || []).reduce(
      (sessionTotal, exercise) => sessionTotal + exercise.sets
        .filter(set => set.completed)
        .reduce((exerciseTotal, set) => exerciseTotal + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0),
      0
    ), 0);

  // Modais e Notificações
  const [toast, setToast] = useState(null);
  const [instructionModal, setInstructionModal] = useState(null);
  const [substituteModal, setSubstituteModal] = useState(null);
  const [workoutEditorOpen, setWorkoutEditorOpen] = useState(false);
  const [workoutDraft, setWorkoutDraft] = useState(null);
  const [newExerciseDraft, setNewExerciseDraft] = useState({
    name: '',
    muscle: '',
    targetSets: 3,
    targetReps: '8-12',
    restSeconds: 90,
    instructions: ''
  });
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Formulário de Edição de Perfil e Antropometria
  const [profileForm, setProfileForm] = useState(userProfile);

  useEffect(() => {
    setProfileForm(userProfile);
  }, [userProfile]);

  // Restaurar o último estado salvo neste navegador.
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const data = JSON.parse(savedState);
        if (data.theme) setTheme(data.theme);
        if (data.appName) setAppName(data.appName);
        if (data.userProfile) setUserProfile(data.userProfile);
        if (data.workouts) setWorkouts(data.workouts);
        if (data.bodyHistory) setBodyHistory(data.bodyHistory);
        if (data.sessionLogs) setSessionLogs(data.sessionLogs);
        const savedHabitDate = data.selectedHabitDate || DEFAULT_HABITS_DATE;
        const savedHabitHistory = data.habitHistory || (data.habits ? { [savedHabitDate]: data.habits } : {});
        setSelectedHabitDate(savedHabitDate);
        setHabitCalendarMonth(savedHabitDate.slice(0, 7));
        setHabitHistory(savedHabitHistory);
        setHabits(savedHabitHistory[savedHabitDate] || data.habits || INITIAL_HABITS);
        if (data.selectedWorkoutKey) setSelectedWorkoutKey(data.selectedWorkoutKey);
        if (typeof data.warmupCompleted === 'boolean') setWarmupCompleted(data.warmupCompleted);
      }
      setSyncStatus('synced');
    } catch (err) {
      console.error('Erro ao carregar dados locais:', err);
      setSyncStatus('error');
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  const saveState = async (customData = null) => {
    setSyncStatus('saving');
    try {
      const payload = customData || {
        theme,
        appName,
        userProfile,
        workouts,
        bodyHistory,
        sessionLogs,
        habits,
        selectedHabitDate,
        habitHistory,
        selectedWorkoutKey,
        warmupCompleted,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSyncStatus('synced');
    } catch (err) {
      console.error('Erro ao salvar dados locais:', err);
      setSyncStatus('error');
    }
  };

  useEffect(() => {
    if (!storageLoaded) return;
    setSyncStatus('saving');
    const timer = setTimeout(() => {
      saveState();
    }, 500);
    return () => clearTimeout(timer);
  }, [storageLoaded, theme, appName, userProfile, workouts, bodyHistory, sessionLogs, habits, selectedHabitDate, habitHistory, selectedWorkoutKey, warmupCompleted]);

  // Importar arquivo de Backup JSON
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const newProfile = parsed.userProfile || userProfile;
        const newWorkouts = parsed.workouts || workouts;
        const newHistory = parsed.bodyHistory || bodyHistory;
        const newLogs = parsed.sessionLogs || sessionLogs;
        const newHabits = parsed.habits || habits;
        const newHabitDate = parsed.selectedHabitDate || DEFAULT_HABITS_DATE;
        const newHabitHistory = parsed.habitHistory || { [newHabitDate]: newHabits };

        setUserProfile(newProfile);
        setProfileForm(newProfile);
        setWorkouts(newWorkouts);
        setBodyHistory(newHistory);
        setSessionLogs(newLogs);
        setSelectedHabitDate(newHabitDate);
        setHabitCalendarMonth(newHabitDate.slice(0, 7));
        setHabitHistory(newHabitHistory);
        setHabits(newHabitHistory[newHabitDate] || newHabits);

        await saveState({
          theme,
          appName,
          userProfile: newProfile,
          workouts: newWorkouts,
          bodyHistory: newHistory,
          sessionLogs: newLogs,
          habits: newHabits,
          selectedHabitDate: newHabitDate,
          habitHistory: newHabitHistory,
          selectedWorkoutKey,
          warmupCompleted,
          updatedAt: new Date().toISOString()
        });
        showToast('Backup importado e salvo neste dispositivo!', 'highlight');
      } catch (err) {
        showToast('Arquivo de backup inválido.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Notificação Toast Rápida
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Cronômetro de Descanso (Tick)
  useEffect(() => {
    let interval = null;
    if (restTimer.active && restTimer.secondsLeft > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => ({ ...prev, secondsLeft: prev.secondsLeft - 1 }));
      }, 1000);
    } else if (restTimer.active && restTimer.secondsLeft === 0) {
      setRestTimer(prev => ({ ...prev, active: false }));
      showToast(`Descanso finalizado! Hora da próxima série de ${restTimer.exerciseName}.`, 'highlight');
    }
    return () => clearInterval(interval);
  }, [restTimer.active, restTimer.secondsLeft, restTimer.exerciseName]);

  // Cronômetro da Sessão em Andamento
  useEffect(() => {
    let interval = null;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  // Formatar Segundos em MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  // ==========================================
  // CONFIGURAÇÃO DE TEMAS VISUAIS
  // ==========================================
  const themeConfig = useMemo(() => {
    if (theme === 'clean') {
      return {
        bgMain: 'bg-slate-50 text-slate-900',
        bgCard: 'bg-white border-slate-200 shadow-sm',
        bgCardAlt: 'bg-slate-100 border-slate-200',
        textMuted: 'text-slate-500',
        accentBg: 'bg-blue-600 hover:bg-blue-700 text-white',
        accentText: 'text-blue-600',
        accentBorder: 'border-blue-600',
        accentBadge: 'bg-blue-50 text-blue-700 border-blue-200',
        navBg: 'bg-white/95 border-slate-200'
      };
    }
    if (theme === 'sport') {
      return {
        bgMain: 'bg-neutral-950 text-white',
        bgCard: 'bg-neutral-900 border-neutral-800',
        bgCardAlt: 'bg-neutral-800/70 border-neutral-700',
        textMuted: 'text-neutral-400',
        accentBg: 'bg-red-600 hover:bg-red-500 text-white',
        accentText: 'text-red-500',
        accentBorder: 'border-red-500',
        accentBadge: 'bg-red-500/15 text-red-400 border-red-500/30',
        navBg: 'bg-neutral-900/95 border-neutral-800'
      };
    }
    // Default: Dark Premium (Preto, Grafite e Verde-Limão)
    return {
      bgMain: 'bg-zinc-950 text-zinc-100',
      bgCard: 'bg-zinc-900/90 border-zinc-800',
      bgCardAlt: 'bg-zinc-800/60 border-zinc-700/70',
      textMuted: 'text-zinc-400',
      accentBg: 'bg-lime-400 hover:bg-lime-300 text-zinc-950',
      accentText: 'text-lime-400',
      accentBorder: 'border-lime-400',
      accentBadge: 'bg-lime-400/15 text-lime-300 border-lime-400/30',
      navBg: 'bg-zinc-900/95 border-zinc-800'
    };
  }, [theme]);

  const currentWorkout = workouts[selectedWorkoutKey];

  // Progresso da Sessão Atual
  const workoutProgress = useMemo(() => {
    const allSets = currentWorkout.exercises.flatMap(ex => ex.sets);
    const done = allSets.filter(s => s.completed).length;
    const total = allSets.length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, percent };
  }, [currentWorkout]);

  // Exercícios prontos para Progressão Dupla
  const readyProgressions = useMemo(() => {
    const list = [];
    Object.keys(workouts).forEach(wKey => {
      const w = workouts[wKey];
      w.exercises.forEach(ex => {
        if (ex.progressionStatus === 'ready') {
          list.push({
            ...ex,
            workoutKey: wKey,
            workoutName: w.name
          });
        }
      });
    });
    return list;
  }, [workouts]);

  // ==========================================
  // HANDLERS DE TREINO E PROGRESSÃO DUPLA
  // ==========================================
  const handleUpdateSet = (workoutKey, exerciseId, setNumber, field, value) => {
    setWorkouts(prev => {
      const updated = { ...prev };
      const workout = { ...updated[workoutKey] };
      workout.exercises = workout.exercises.map(ex => {
        if (ex.id !== exerciseId) return ex;
        const newSets = ex.sets.map(s =>
          s.setNumber === setNumber ? { ...s, [field]: value } : s
        );
        return { ...ex, sets: newSets };
      });
      updated[workoutKey] = workout;
      return updated;
    });
  };

  const handleToggleSetComplete = (workoutKey, exercise, setItem) => {
    const willComplete = !setItem.completed;
    setWorkouts(prev => {
      const updated = { ...prev };
      const workout = { ...updated[workoutKey] };
      workout.exercises = workout.exercises.map(ex => {
        if (ex.id !== exercise.id) return ex;
        const newSets = ex.sets.map(s =>
          s.setNumber === setItem.setNumber ? { ...s, completed: willComplete } : s
        );

        // Verifica se bateu o topo da faixa em todas as séries concluídas (Progressão Dupla)
        const allDone = newSets.every(s => s.completed);
        const allHitMax = newSets.every(s => Number(s.reps) >= ex.maxRepTarget);
        let newStatus = ex.progressionStatus;
        let newNote = ex.progressionNote;
        let newSuggested = ex.suggestedWeight;

        if (allDone && allHitMax) {
          newStatus = 'ready';
          newSuggested = +(Number(newSets[0].weight) + ex.increment).toFixed(1);
          newNote = `Meta atingida (${ex.targetSets}×${ex.maxRepTarget})! Sugestão na próxima: ${newSets[0].weight} → ${newSuggested} kg.`;
        }

        return {
          ...ex,
          sets: newSets,
          progressionStatus: newStatus,
          progressionNote: newNote,
          suggestedWeight: newSuggested
        };
      });
      updated[workoutKey] = workout;
      return updated;
    });

    if (willComplete) {
      setRestTimer({
        active: true,
        secondsLeft: exercise.restSeconds,
        totalSeconds: exercise.restSeconds,
        exerciseName: exercise.name
      });
    }
  };

  const handleApproveProgression = (workoutKey, exerciseId, newWeight) => {
    setWorkouts(prev => {
      const updated = { ...prev };
      const workout = { ...updated[workoutKey] };
      workout.exercises = workout.exercises.map(ex => {
        if (ex.id !== exerciseId) return ex;
        const minRep = parseInt(ex.targetReps, 10) || 8;
        return {
          ...ex,
          lastWeight: ex.sets[0]?.weight || ex.lastWeight,
          progressionStatus: 'increased',
          progressionNote: `Carga atualizada para ${newWeight} kg! Retorne ao início da faixa (${minRep} reps) com boa técnica.`,
          sets: ex.sets.map(s => ({
            ...s,
            weight: newWeight,
            reps: minRep
          }))
        };
      });
      updated[workoutKey] = workout;
      return updated;
    });
    showToast(`Progressão aprovada! Carga ajustada para ${newWeight} kg.`);
  };

  const handleDismissProgression = (workoutKey, exerciseId) => {
    setWorkouts(prev => {
      const updated = { ...prev };
      const workout = { ...updated[workoutKey] };
      workout.exercises = workout.exercises.map(ex =>
        ex.id === exerciseId
          ? {
              ...ex,
              progressionStatus: 'maintain',
              progressionNote: 'Carga mantida por sua escolha para consolidar a execução.'
            }
          : ex
      );
      updated[workoutKey] = workout;
      return updated;
    });
    showToast('Carga mantida! Foco na consistência técnica.');
  };

  const handleSubstituteExercise = (workoutKey, exerciseId, newName) => {
    setWorkouts(prev => {
      const updated = { ...prev };
      const workout = { ...updated[workoutKey] };
      workout.exercises = workout.exercises.map(ex =>
        ex.id === exerciseId ? { ...ex, name: newName } : ex
      );
      updated[workoutKey] = workout;
      return updated;
    });
    setSubstituteModal(null);
    showToast(`Exercício substituído por ${newName}!`);
  };

  const openWorkoutEditor = () => {
    setWorkoutDraft(JSON.parse(JSON.stringify(workouts[selectedWorkoutKey])));
    setNewExerciseDraft({ name: '', muscle: '', targetSets: 3, targetReps: '8-12', restSeconds: 90, instructions: '' });
    setWorkoutEditorOpen(true);
  };

  const updateWorkoutDraftExercise = (exerciseId, field, value) => {
    setWorkoutDraft(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise => {
        if (exercise.id !== exerciseId) return exercise;
        if (field === 'targetSets') {
          const targetSets = Math.max(1, Math.min(20, Number(value) || 1));
          const sets = Array.from({ length: targetSets }, (_, index) =>
            exercise.sets[index] || { setNumber: index + 1, weight: 0, reps: 0, rir: '1-2', completed: false }
          );
          return { ...exercise, targetSets, sets };
        }
        if (field === 'restSeconds') {
          const restSeconds = Math.max(0, Math.min(600, Number(value) || 0));
          return { ...exercise, restSeconds, restLabel: `${restSeconds} s` };
        }
        if (field === 'targetReps') {
          const repValues = String(value).match(/\d+/g);
          return { ...exercise, targetReps: value, maxRepTarget: repValues ? Number(repValues[repValues.length - 1]) : 0 };
        }
        if (field === 'name') return { ...exercise, name: value, originalName: value };
        return { ...exercise, [field]: value };
      })
    }));
  };

  const handleAddExercise = event => {
    event.preventDefault();
    if (!newExerciseDraft.name.trim() || !newExerciseDraft.muscle.trim() || !newExerciseDraft.targetReps.trim()) {
      showToast('Preencha nome, grupo muscular e faixa de repetições.', 'error');
      return;
    }
    const targetSets = Math.max(1, Math.min(20, Number(newExerciseDraft.targetSets) || 1));
    const restSeconds = Math.max(0, Math.min(600, Number(newExerciseDraft.restSeconds) || 0));
    const repValues = newExerciseDraft.targetReps.match(/\d+/g);
    const exerciseName = newExerciseDraft.name.trim();
    const exercise = {
      id: `custom-${Date.now()}`,
      name: exerciseName,
      originalName: exerciseName,
      muscle: newExerciseDraft.muscle.trim(),
      targetSets,
      targetReps: newExerciseDraft.targetReps.trim(),
      maxRepTarget: repValues ? Number(repValues[repValues.length - 1]) : 0,
      restSeconds,
      restLabel: `${restSeconds} s`,
      lastSummary: 'Sem histórico',
      lastWeight: 0,
      suggestedWeight: 0,
      progressionStatus: 'maintain',
      progressionNote: 'Registre suas séries para acompanhar a progressão.',
      increment: 2.5,
      substitutions: [exerciseName],
      instructions: newExerciseDraft.instructions.trim() || 'Adicione instruções de execução quando necessário.',
      sets: createEmptySets(targetSets)
    };
    setWorkoutDraft(prev => ({ ...prev, exercises: [...prev.exercises, exercise] }));
    setNewExerciseDraft({ name: '', muscle: '', targetSets: 3, targetReps: '8-12', restSeconds: 90, instructions: '' });
    showToast(`${exerciseName} adicionado ao rascunho.`);
  };

  const handleSaveWorkoutDraft = () => {
    if (!workoutDraft || !workoutDraft.name.trim() || workoutDraft.exercises.length === 0) {
      showToast('Informe um nome e mantenha ao menos um exercício na sessão.', 'error');
      return;
    }
    const invalidExercise = workoutDraft.exercises.some(exercise =>
      !exercise.name.trim() || !exercise.muscle.trim() || !exercise.targetReps.trim()
    );
    if (invalidExercise) {
      showToast('Preencha nome, grupo muscular e repetições em todos os exercícios.', 'error');
      return;
    }
    setWorkouts(prev => ({ ...prev, [selectedWorkoutKey]: workoutDraft }));
    setWorkoutEditorOpen(false);
    showToast(`Ficha da sessão ${selectedWorkoutKey} salva.`);
  };

  const handleFinishWorkout = () => {
    const finishedAt = new Date();
    const workoutDate = getLocalDateKey(finishedAt);
    const totalVol = currentWorkout.exercises.reduce((acc, ex) => {
      return (
        acc +
        ex.sets.reduce((sAcc, s) => {
          return sAcc + (Number(s.weight) || 0) * (Number(s.reps) || 0);
        }, 0)
      );
    }, 0);

    const newLog = {
      id: `log-${Date.now()}`,
      dateISO: workoutDate,
      date: finishedAt.toLocaleDateString('pt-BR'),
      workout: currentWorkout.name,
      duration: `${Math.max(1, Math.round(sessionElapsedSeconds / 60))} min`,
      volume: `${totalVol.toLocaleString('pt-BR')} kg`,
      status: 'Concluído',
      highlight: `${workoutProgress.done}/${workoutProgress.total} séries registradas`,
      exercises: currentWorkout.exercises.map(ex => ({
        name: ex.name,
        sets: ex.sets.map(set => ({
          setNumber: set.setNumber,
          weight: Number(set.weight) || 0,
          reps: Number(set.reps) || 0,
          completed: set.completed
        }))
      }))
    };

    setSessionLogs(prev => [newLog, ...prev]);
    setSelectedWorkoutSummaryDate(workoutDate);
    setUserProfile(prev => ({
      ...prev,
      weeklyCompleted: Math.min(prev.weeklyTarget, prev.weeklyCompleted + 1)
    }));
    const workoutOrder = ['A', 'B', 'C'];
    const currentWorkoutIndex = workoutOrder.indexOf(selectedWorkoutKey);
    setSelectedWorkoutKey(workoutOrder[(currentWorkoutIndex + 1) % workoutOrder.length]);
    setRestTimer(prev => ({ ...prev, active: false }));
    setSessionActive(false);
    setSessionElapsedSeconds(0);
    showToast(`${currentWorkout.name} finalizado e salvo no histórico!`, 'highlight');
    setActiveTab('evolution');
    setEvolutionSubTab('calendar');
  };

  const handleAddBodyAssessment = (e) => {
    e.preventDefault();
    const w = Number(newAssessment.weight || userProfile.currentWeight);
    const waist = Number(newAssessment.waist || userProfile.currentWaist);
    if (!w || !waist) {
      showToast('Informe peso e cintura para registrar a avaliação.', 'error');
      return;
    }
    const lastStrength = bodyHistory.length > 0 ? bodyHistory[bodyHistory.length - 1].strengthIdx : 100;

    const entry = {
      date: `Aval ${bodyHistory.length + 1}`,
      fullDate: 'Hoje',
      weight: w,
      waist,
      chest: Number(newAssessment.chest) || 0,
      arm: Number(newAssessment.arm) || 0,
      thigh: Number(newAssessment.thigh) || 0,
      strengthIdx: +(lastStrength + 0.8).toFixed(1),
      note: newAssessment.note || 'Registro de acompanhamento'
    };

    setBodyHistory(prev => [...prev, entry]);
    setUserProfile(prev => ({
      ...prev,
      currentWeight: w,
      currentWaist: waist
    }));
    showToast('Medidas corporais registradas com sucesso!');
  };

  // Cálculo de IMC, Composição Corporal e Índices Antropométricos
  const weightDiff = +(userProfile.currentWeight - userProfile.initialWeight).toFixed(1);
  const waistDiff = +(userProfile.currentWaist - userProfile.initialWaist).toFixed(1);

  const anthropometrics = useMemo(() => {
    const weight = Number(profileForm.currentWeight) || 0;
    const heightCm = Number(profileForm.heightCm) || (Number(profileForm.height) * 100) || 0;
    const heightM = heightCm / 100;
    const waist = Number(profileForm.currentWaist) || 0;
    const neck = Number(profileForm.neck) || 0;
    const hip = Number(profileForm.hip) || 0;
    const age = Number(profileForm.age) || 0;
    const sex = profileForm.sex;

    // 1. IMC
    const bmi = weight > 0 && heightM > 0 ? +(weight / (heightM * heightM)).toFixed(1) : null;
    let bmiCategory = bmi === null ? 'Preencha peso e altura' : 'Peso Normal';
    if (bmi !== null && bmi < 18.5) bmiCategory = 'Abaixo do Peso';
    else if (bmi !== null && bmi >= 25 && bmi < 30) bmiCategory = 'Sobrepeso (ou Massa Muscular Elevada)';
    else if (bmi !== null && bmi >= 30) bmiCategory = 'Obesidade';

    // 2. Relação Cintura-Estatura (RCE / WHtR) - Meta de saúde cardiovascular < 0.50
    const whtr = waist > 0 && heightCm > 0 ? +(waist / heightCm).toFixed(2) : null;
    const whtrStatus = whtr === null ? 'Preencha cintura e altura' : whtr < 0.5 ? 'Risco Baixo (< 0.50)' : whtr < 0.55 ? 'Atenção Moderada' : 'Risco Elevado';

    // 3. % de Gordura Corporal (Fórmula da Marinha dos EUA / US Navy)
    let estimatedBF = null;
    if (profileForm.manualBodyFat !== '' && !isNaN(Number(profileForm.manualBodyFat)) && Number(profileForm.manualBodyFat) > 0) {
      estimatedBF = +Number(profileForm.manualBodyFat).toFixed(1);
    } else if (
      waist > 0 &&
      neck > 0 &&
      heightCm > 0 &&
      (sex === 'M' || sex === 'F') &&
      (sex !== 'M' || waist > neck) &&
      (sex !== 'F' || hip > 0)
    ) {
      if (sex === 'M') {
        const val = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(10, waist - neck)) + 0.15456 * Math.log10(heightCm)) - 450;
        if (!isNaN(val) && val > 3 && val < 60) estimatedBF = +val.toFixed(1);
      } else {
        const val = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(10, waist + hip - neck)) + 0.22100 * Math.log10(heightCm)) - 450;
        if (!isNaN(val) && val > 5 && val < 65) estimatedBF = +val.toFixed(1);
      }
    }

    const fatMassKg = weight > 0 && estimatedBF !== null ? +((weight * estimatedBF) / 100).toFixed(1) : null;
    const leanMassKg = weight > 0 && fatMassKg !== null ? +(weight - fatMassKg).toFixed(1) : null;

    // 4. Taxa Metabólica Basal (Mifflin-St Jeor)
    const bmr = weight > 0 && heightCm > 0 && age > 0 && sex
      ? Math.round(10 * weight + 6.25 * heightCm - 5 * age + (sex === 'M' ? 5 : -161))
      : null;

    return {
      bmi,
      bmiCategory,
      whtr,
      whtrStatus,
      bodyFat: estimatedBF,
      fatMassKg,
      leanMassKg,
      bmr,
      recommendedWaterMl: weight > 0 ? Math.round(weight * 35) : null
    };
  }, [profileForm]);

  // Salvar Perfil e Dados Antropométricos
  const handleSaveProfileAndAnthropometry = async (e, recordInHistory = true) => {
    if (e) e.preventDefault();
    const hCm = Number(profileForm.heightCm) || (Number(profileForm.height) * 100) || 0;
    const hM = +(hCm / 100).toFixed(2);
    const currW = Number(profileForm.currentWeight) || 0;
    const currWaist = Number(profileForm.currentWaist) || 0;

    const updatedProfile = {
      ...profileForm,
      heightCm: hCm,
      height: hM,
      initialWeight: Number(profileForm.initialWeight) || currW,
      currentWeight: currW,
      goalWeight: Number(profileForm.goalWeight) || 0,
      initialWaist: Number(profileForm.initialWaist) || currWaist,
      currentWaist: currWaist
    };

    const updatedHabits = {
      ...habits,
      waterGoalMl: Math.round(currW * 35)
    };

    let updatedHistory = bodyHistory;
    if (recordInHistory && currW > 0 && currWaist > 0) {
      const lastStrength = bodyHistory.length > 0 ? bodyHistory[bodyHistory.length - 1].strengthIdx : 100;
      const newEntry = {
        date: `Aval ${bodyHistory.length + 1}`,
        fullDate: 'Hoje',
        weight: currW,
        waist: currWaist,
        chest: Number(profileForm.chest) || 0,
        arm: Number(profileForm.armContractedRight) || 0,
        thigh: Number(profileForm.thighRight) || 0,
        strengthIdx: lastStrength,
        note: `BF: ${anthropometrics.bodyFat ?? '—'}% • Massa Magra: ${anthropometrics.leanMassKg ?? '—'}kg`
      };
      updatedHistory = [...bodyHistory, newEntry];
      setBodyHistory(updatedHistory);
    }

    setUserProfile(updatedProfile);
    updateHabits(updatedHabits);
    setProfileModalOpen(false);

    await saveState({
      theme,
      appName,
      userProfile: updatedProfile,
      workouts,
      bodyHistory: updatedHistory,
      sessionLogs,
      habits: updatedHabits,
      selectedHabitDate,
      habitHistory: { ...habitHistory, [selectedHabitDate]: updatedHabits },
      selectedWorkoutKey,
      warmupCompleted,
      updatedAt: new Date().toISOString()
    });

    showToast('Perfil e medidas salvos neste dispositivo!');
  };

  // Funções de Reset de Dados
  const handleResetToDefaultSheet = async () => {
    const cleanWorkouts = JSON.parse(JSON.stringify(INITIAL_WORKOUTS));
    setUserProfile(DEFAULT_USER_PROFILE);
    setProfileForm(DEFAULT_USER_PROFILE);
    setWorkouts(cleanWorkouts);
    setBodyHistory(INITIAL_BODY_HISTORY);
    setSessionLogs(INITIAL_SESSION_LOGS);
    setHabits(INITIAL_HABITS);
    setHabitHistory({});
    setSelectedHabitDate(DEFAULT_HABITS_DATE);
    setHabitCalendarMonth(DEFAULT_HABITS_DATE.slice(0, 7));
    setWarmupCompleted(false);
    setSessionElapsedSeconds(0);
    setSessionActive(false);
    setResetModalOpen(false);

    await saveState({
      theme,
      appName,
      userProfile: DEFAULT_USER_PROFILE,
      workouts: cleanWorkouts,
      bodyHistory: INITIAL_BODY_HISTORY,
      sessionLogs: INITIAL_SESSION_LOGS,
      habits: INITIAL_HABITS,
      selectedHabitDate: DEFAULT_HABITS_DATE,
      habitHistory: {},
      selectedWorkoutKey: 'A',
      warmupCompleted: false,
      updatedAt: new Date().toISOString()
    });

    showToast('Ficha de treinos restaurada e dados pessoais removidos.', 'highlight');
  };

  const handleResetToBlankProfile = async () => {
    const blankProfile = DEFAULT_USER_PROFILE;
    const cleanWorkouts = JSON.parse(JSON.stringify(INITIAL_WORKOUTS));

    setUserProfile(blankProfile);
    setProfileForm(blankProfile);
    setWorkouts(cleanWorkouts);
    setBodyHistory(INITIAL_BODY_HISTORY);
    setSessionLogs([]);
    setHabits(INITIAL_HABITS);
    setHabitHistory({});
    setSelectedHabitDate(DEFAULT_HABITS_DATE);
    setHabitCalendarMonth(DEFAULT_HABITS_DATE.slice(0, 7));
    setWarmupCompleted(false);
    setSessionElapsedSeconds(0);
    setSessionActive(false);
    setResetModalOpen(false);
    setProfileModalOpen(true);

    await saveState({
      theme,
      appName,
      userProfile: blankProfile,
      workouts: cleanWorkouts,
      bodyHistory: INITIAL_BODY_HISTORY,
      sessionLogs: [],
      habits: INITIAL_HABITS,
      selectedHabitDate: DEFAULT_HABITS_DATE,
      habitHistory: {},
      selectedWorkoutKey: 'A',
      warmupCompleted: false,
      updatedAt: new Date().toISOString()
    });

    showToast('Dados zerados neste dispositivo. Preencha seu novo perfil.', 'highlight');
  };

  return (
    <div className={`min-h-screen pb-28 md:pb-12 transition-colors duration-300 ${themeConfig.bgMain}`}>
      {/* TOAST DE FEEDBACK */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-bounce">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl ${
            theme === 'clean' ? 'bg-slate-900 text-white border-slate-700' : 'bg-zinc-900 text-lime-400 border-lime-400/50'
          }`}>
            <Sparkles className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* BARRA SUPERIOR / IDENTIDADE DO APP */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${themeConfig.navBg}`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${themeConfig.accentBg}`}>
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold tracking-tight text-lg sm:text-xl leading-none">
                  {appName}
                </h1>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-semibold ${themeConfig.accentBadge}`}>
                  v1.0 Pro
                </span>
              </div>
              <p className={`text-xs font-medium tracking-widest uppercase mt-0.5 ${themeConfig.textMuted}`}>
                TRAIN • TRACK • EVOLVE
              </p>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'dashboard', label: 'Início', icon: Activity },
              { id: 'workouts', label: 'Treinos', icon: Dumbbell },
              { id: 'evolution', label: 'Evolução', icon: TrendingUp },
              { id: 'habits', label: 'Hábitos', icon: Heart },
              { id: 'profile', label: 'Biblioteca & Perfil', icon: User }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? themeConfig.accentBg
                      : `${themeConfig.textMuted} hover:opacity-100 opacity-80`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Seletor de tema, status de salvamento, perfil e redefinição */}
          <div className="flex items-center gap-2">
            {/* Indicador de salvamento automático neste dispositivo */}
            <button
              onClick={() => {
                saveState();
                showToast('Salvamento local concluído!');
              }}
              className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                syncStatus === 'synced'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : syncStatus === 'saving'
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                  : syncStatus === 'error'
                  ? 'border-red-500/30 bg-red-500/10 text-red-400'
                  : 'border-zinc-700 bg-zinc-800/60 text-zinc-400'
              }`}
              title="Status do salvamento local (clique para salvar agora)"
            >
              <Save className={`w-3.5 h-3.5 ${syncStatus === 'saving' ? 'animate-bounce' : ''}`} />
              <span className="hidden lg:inline">
                {syncStatus === 'synced'
                  ? 'Salvo neste dispositivo'
                  : syncStatus === 'saving'
                  ? 'Salvando...'
                  : syncStatus === 'error'
                  ? 'Falha ao salvar'
                  : 'Carregando...'}
              </span>
            </button>

            <button
              onClick={() => setProfileModalOpen(true)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${themeConfig.bgCardAlt} hover:border-lime-400`}
              title="Editar Perfil e Medidas Antropométricas"
            >
              <Ruler className={`w-3.5 h-3.5 ${themeConfig.accentText}`} />
              <span className="hidden sm:inline">{userProfile.name || 'Criar Perfil'}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${themeConfig.accentBadge}`}>
                {userProfile.currentWeight}kg
              </span>
            </button>

            <button
              onClick={() => setResetModalOpen(true)}
              className="p-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              title="Resetar Dados do Aplicativo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-zinc-800">
              <button
                onClick={() => setTheme('dark')}
                title="Dark Premium (Verde-Limão)"
                className={`w-6 h-6 rounded-full bg-zinc-900 border-2 flex items-center justify-center ${
                  theme === 'dark' ? 'border-lime-400 scale-110' : 'border-zinc-700 opacity-60'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
              </button>
              <button
                onClick={() => setTheme('clean')}
                title="Clean (Branco e Azul)"
                className={`w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center ${
                  theme === 'clean' ? 'border-blue-600 scale-110' : 'border-slate-300 opacity-60'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              </button>
              <button
                onClick={() => setTheme('sport')}
                title="Sport (Preto e Vermelho)"
                className={`w-6 h-6 rounded-full bg-neutral-900 border-2 flex items-center justify-center ${
                  theme === 'sport' ? 'border-red-500 scale-110' : 'border-neutral-700 opacity-60'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* BARRA DE ABAS RÁPIDA MOBILE NO TOPO (SEMPRE VISÍVEL NO CELULAR VERTICAL) */}
        <div className="md:hidden border-t border-zinc-800/70 px-2 py-2">
          <div className="grid grid-cols-5 gap-1">
            {[
              { id: 'dashboard', label: 'Início', icon: Activity },
              { id: 'workouts', label: 'Treinos', icon: Dumbbell },
              { id: 'evolution', label: 'Evolução', icon: TrendingUp },
              { id: 'habits', label: 'Hábitos', icon: Heart },
              { id: 'profile', label: 'Perfil', icon: User }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    isActive
                      ? `${themeConfig.accentBg} shadow-md`
                      : `${themeConfig.bgCardAlt} ${themeConfig.textMuted}`
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-extrabold leading-none tracking-tight truncate w-full text-center">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* CRONÔMETRO DE DESCANSO FLUTUANTE GLOBAL */}
      {restTimer.active && (
        <div className="fixed bottom-24 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-40">
          <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
            theme === 'clean' ? 'bg-slate-900/95 text-white border-slate-700' : 'bg-zinc-900/95 text-white border-lime-400/50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 animate-spin ${themeConfig.accentText}`} style={{ animationDuration: '6s' }} />
                <div>
                  <span className="text-xs uppercase tracking-wider text-zinc-400 block">Cronômetro de Descanso</span>
                  <span className="text-sm font-bold truncate block max-w-[200px]">{restTimer.exerciseName}</span>
                </div>
              </div>
              <div className={`text-3xl font-black font-mono ${themeConfig.accentText}`}>
                {formatTime(restTimer.secondsLeft)}
              </div>
            </div>

            {/* Barra de progresso do descanso */}
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-500 ${
                  theme === 'clean' ? 'bg-blue-500' : theme === 'sport' ? 'bg-red-500' : 'bg-lime-400'
                }`}
                style={{ width: `${(restTimer.secondsLeft / restTimer.totalSeconds) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setRestTimer(prev => ({ ...prev, secondsLeft: Math.max(0, prev.secondsLeft - 15) }))}
                className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold"
              >
                -15s
              </button>
              <button
                onClick={() => setRestTimer(prev => ({ ...prev, secondsLeft: prev.secondsLeft + 15, totalSeconds: Math.max(prev.totalSeconds, prev.secondsLeft + 15) }))}
                className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold"
              >
                +15s
              </button>
              <button
                onClick={() => setRestTimer(prev => ({ ...prev, active: false }))}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold ${themeConfig.accentBg}`}
              >
                Pular Descanso
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {/* ==========================================
            ABA 1: DASHBOARD (INÍCIO)
           ========================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Banner Hero de Identidade */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden ${themeConfig.bgCard}`}>
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider bg-lime-400/10 text-lime-400 border-lime-400/20">
                      <Zap className="w-3.5 h-3.5" />
                      {userProfile.name ? `Perfil: ${userProfile.name}` : 'Seu esforço. Seus resultados.'}
                    </div>
                    <button
                      onClick={() => setProfileModalOpen(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${themeConfig.bgCardAlt} hover:border-lime-400`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Editar Perfil & Antropometria
                    </button>
                    <button
                      onClick={() => setResetModalOpen(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Resetar Dados
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    Treinamento inteligente, acompanhamento de cargas e evolução corporal.
                  </h2>
                  <p className={`text-sm ${themeConfig.textMuted}`}>
                    Treinos Full Body 3x por semana. {anthropometrics.bodyFat !== null
                      ? <>BF estimado: <strong>{anthropometrics.bodyFat}%</strong> ({anthropometrics.leanMassKg ?? '—'} kg de massa magra).</>
                      : 'Preencha peso, altura e medidas no perfil para calcular BF e massa magra.'}
                  </p>
                </div>

                {/* Resumo da rotina de treino */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
                  <div className={`p-3.5 rounded-2xl border text-center ${themeConfig.bgCardAlt}`}>
                    <span className={`text-2xl sm:text-3xl font-black block ${themeConfig.accentText}`}>
                      {userProfile.initialWeight ? `${userProfile.initialWeight} kg` : '—'}
                    </span>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Peso inicial</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl border text-center ${themeConfig.bgCardAlt}`}>
                    <span className={`text-2xl sm:text-3xl font-black block ${themeConfig.accentText}`}>
                      {userProfile.weeklyTarget}x
                    </span>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Por semana</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl border text-center ${themeConfig.bgCardAlt}`}>
                    <span className={`text-2xl sm:text-3xl font-black block ${themeConfig.accentText}`}>
                      60 min
                    </span>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Por sessão</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Principal: Próximo Treino + Recomposição Corporal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card Próximo Treino Programado */}
              <div className={`lg:col-span-7 p-6 rounded-3xl border flex flex-col justify-between ${themeConfig.bgCard}`}>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${themeConfig.accentText}`}>
                        Próximo Treino Programado
                      </span>
                      <h3 className="text-2xl font-black mt-0.5">
                        {currentWorkout.name} — Sessão {selectedWorkoutKey}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${themeConfig.accentBadge}`}>
                      {currentWorkout.exercises.length} exercícios
                    </span>
                  </div>

                  <p className={`text-sm mb-4 ${themeConfig.textMuted}`}>
                    <strong>Ênfase:</strong> {currentWorkout.emphasis}. {currentWorkout.organizationTip}
                  </p>

                  {/* Seletor rápido de qual treino iniciar */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {['A', 'B', 'C'].map(key => (
                      <button
                        key={key}
                        onClick={() => setSelectedWorkoutKey(key)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedWorkoutKey === key
                            ? `${themeConfig.accentBorder} ${themeConfig.bgCardAlt}`
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="text-xs font-bold">TREINO {key}</div>
                        <div className={`text-[11px] truncate ${themeConfig.textMuted}`}>
                          Sessão {key}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Preview rápido dos primeiros exercícios */}
                  <div className="space-y-2 mb-6">
                    {currentWorkout.exercises.slice(0, 4).map((ex, idx) => (
                      <div key={ex.id} className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border ${themeConfig.bgCardAlt}`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${themeConfig.accentBadge}`}>
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-sm font-semibold block">{ex.name}</span>
                            <span className={`text-xs ${themeConfig.textMuted}`}>
                              Meta: {ex.targetSets} séries de {ex.targetReps} reps
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold block">{ex.sets[0].weight} kg</span>
                          {ex.progressionStatus === 'ready' && (
                            <span className="text-[10px] text-lime-400 font-semibold">Sugestão +carga</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSessionActive(true);
                      setActiveTab('workouts');
                      setGymMode(false);
                    }}
                    className={`flex-1 py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-base font-black shadow-lg transition-transform active:scale-98 ${themeConfig.accentBg}`}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    INICIAR {currentWorkout.name} AGORA
                  </button>
                  <button
                    onClick={() => {
                      setSessionActive(true);
                      setActiveTab('workouts');
                      setGymMode(true);
                    }}
                    className={`py-4 px-5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 ${themeConfig.bgCardAlt}`}
                  >
                    <Maximize2 className="w-4 h-4" />
                    Modo Academia
                  </button>
                </div>
              </div>

              {/* Card Status de Recomposição Corporal e Semana */}
              <div className="lg:col-span-5 space-y-6">
                {/* Painel Recomposição: Peso vs Medidas vs Força */}
                <div className={`p-6 rounded-3xl border ${themeConfig.bgCard}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        Diagnóstico de Recomposição
                      </span>
                      <h3 className="text-lg font-bold">Perda de Gordura + Hipertrofia</h3>
                    </div>
                    <Award className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    <div className={`p-3 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                      <span className={`text-xs block ${themeConfig.textMuted}`}>Peso Atual</span>
                      <span className="text-xl font-black">{userProfile.currentWeight} kg</span>
                      <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                        {weightDiff} kg (Meta {userProfile.goalWeight})
                      </span>
                    </div>
                    <div className={`p-3 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                      <span className={`text-xs block ${themeConfig.textMuted}`}>Abdômen</span>
                      <span className="text-xl font-black">{userProfile.currentWaist} cm</span>
                      <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                        {waistDiff} cm reduzidos
                      </span>
                    </div>
                    <div className={`p-3 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                      <span className={`text-xs block ${themeConfig.textMuted}`}>Força Global</span>
                      <span className="text-xl font-black">+8,4%</span>
                      <span className="text-xs text-lime-400 font-semibold block mt-0.5">
                        Cargas subindo
                      </span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${themeConfig.bgCardAlt}`}>
                    <strong className={themeConfig.accentText}>Análise Inteligente:</strong> Nem todo peso na balança é igual. Como sua circunferência abdominal caiu <strong>2,5 cm</strong> enquanto suas cargas no Leg Press e Supino aumentaram, você está preservando/ganhando massa muscular e perdendo gordura real!
                  </div>
                </div>

                {/* Sequência semanal flexível */}
                <div className={`p-6 rounded-3xl border ${themeConfig.bgCard}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-base">Sessões da Semana</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${themeConfig.accentBadge}`}>
                      {userProfile.weeklyCompleted} de {userProfile.weeklyTarget} sessões
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center my-4">
                    {['A', 'B', 'C'].map((key, index) => {
                      const done = userProfile.weeklyCompleted >= index + 1;
                      const selected = selectedWorkoutKey === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedWorkoutKey(key)}
                          className={`min-h-20 p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${
                            done ? themeConfig.accentBg : selected ? `${themeConfig.accentBorder} ${themeConfig.bgCardAlt}` : themeConfig.bgCardAlt
                          }`}
                        >
                          <span className="text-xs font-black">SESSÃO {key}</span>
                          <span className={`text-[10px] ${themeConfig.textMuted}`}>
                            {done ? 'Concluída' : selected ? 'Próxima' : 'Disponível'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className={`text-xs ${themeConfig.textMuted}`}>
                    Faça os treinos A, B e C nos dias que sua rotina permitir. Mantenha ao menos um dia de recuperação entre sessões sempre que possível.
                  </p>
                </div>
              </div>
            </div>

            {/* Central de Inteligência de Progressão Dupla (Requer Aprovação) */}
            <div className={`p-6 rounded-3xl border ${themeConfig.bgCard}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <Sparkles className={`w-6 h-6 ${themeConfig.accentText}`} />
                  <div>
                    <h3 className="text-lg font-black">Inteligência de Progressão Dupla</h3>
                    <p className={`text-xs ${themeConfig.textMuted}`}>
                      O sistema identifica quando você atinge o topo da faixa de repetições em todas as séries e sugere pequenos aumentos. Nada é alterado sem sua aprovação.
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-center ${themeConfig.accentBadge}`}>
                  {readyProgressions.length} sugestões pendentes
                </span>
              </div>

              {readyProgressions.length === 0 ? (
                <div className={`p-4 rounded-2xl border text-sm text-center ${themeConfig.bgCardAlt}`}>
                  Todas as sugestões de progressão já foram revisadas por você! Continue registrando suas séries.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {readyProgressions.map(item => (
                    <div key={item.id} className={`p-4 rounded-2xl border flex flex-col justify-between ${themeConfig.bgCardAlt}`}>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className={`font-bold ${themeConfig.accentText}`}>{item.workoutName}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                            Meta Atingida!
                          </span>
                        </div>
                        <h4 className="font-bold text-base">{item.name}</h4>
                        <p className={`text-xs mt-1 ${themeConfig.textMuted}`}>
                          Último treino: {item.lastSummary}
                        </p>
                        <div className="my-3 p-2.5 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between">
                          <span className="text-xs font-medium">Sugestão de Carga:</span>
                          <span className={`text-sm font-black ${themeConfig.accentText}`}>
                            {item.lastWeight} kg → {item.suggestedWeight} kg
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleApproveProgression(item.workoutKey, item.id, item.suggestedWeight)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${themeConfig.accentBg}`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          Aprovar ({item.suggestedWeight} kg)
                        </button>
                        <button
                          onClick={() => handleDismissProgression(item.workoutKey, item.id)}
                          className="py-2 px-3 rounded-xl text-xs font-semibold border border-zinc-600 hover:bg-zinc-700/50"
                        >
                          Manter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 2: TREINAMENTO (SÉRIE A SÉRIE + MODO ACADEMIA)
           ========================================== */}
        {activeTab === 'workouts' && (
          <div className="space-y-6">
            {/* Barra de Controle do Treino */}
            <div className={`p-5 rounded-3xl border ${themeConfig.bgCard}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Seletor A, B, C */}
                <div className="flex items-center gap-2">
                  {['A', 'B', 'C'].map(key => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedWorkoutKey(key);
                        setFocusedExerciseIndex(0);
                      }}
                      className={`px-4 py-2.5 rounded-2xl font-black text-sm transition-all ${
                        selectedWorkoutKey === key
                          ? themeConfig.accentBg
                          : `${themeConfig.bgCardAlt} border hover:opacity-100 opacity-75`
                      }`}
                    >
                      TREINO {key}
                      <span className="block text-[10px] font-normal opacity-80">
                          Sessão {key}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={openWorkoutEditor}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${themeConfig.bgCardAlt}`}
                    title="Editar exercícios da sessão selecionada"
                  >
                    <Sliders className="w-4 h-4" />
                    Editar ficha
                  </button>
                </div>

                {/* Status da Sessão e Botão Modo Academia */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 ${themeConfig.bgCardAlt}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${sessionActive ? 'bg-emerald-400 animate-ping' : 'bg-zinc-500'}`} />
                    <span className="text-xs font-semibold">{sessionActive ? 'Em andamento:' : 'Pausado:'}</span>
                    <span className="text-sm font-mono font-bold">{formatTime(sessionElapsedSeconds)}</span>
                  </div>

                  <button
                    onClick={() => setSessionActive(prev => !prev)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 ${themeConfig.bgCardAlt}`}
                    aria-label={sessionActive ? 'Pausar cronômetro do treino' : sessionElapsedSeconds > 0 ? 'Retomar cronômetro do treino' : 'Iniciar cronômetro do treino'}
                  >
                    {sessionActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {sessionActive ? 'Pausar' : sessionElapsedSeconds > 0 ? 'Retomar' : 'Iniciar'}
                  </button>

                  <button
                    onClick={() => setGymMode(!gymMode)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      gymMode ? themeConfig.accentBg : themeConfig.bgCardAlt
                    }`}
                  >
                    {gymMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    {gymMode ? 'Sair do Modo Academia' : 'Modo Academia (Sem Distrações)'}
                  </button>
                </div>
              </div>

              {/* Barra de Progresso Geral do Treino */}
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                    {currentWorkout.name} • {currentWorkout.emphasis}
                  </span>
                  <p className={`text-xs mt-0.5 ${themeConfig.textMuted}`}>
                    {currentWorkout.organizationTip}
                  </p>
                </div>
                <div className="sm:w-64 shrink-0">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Progresso da Sessão</span>
                    <span>{workoutProgress.done}/{workoutProgress.total} séries ({workoutProgress.percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        theme === 'clean' ? 'bg-blue-600' : theme === 'sport' ? 'bg-red-600' : 'bg-lime-400'
                      }`}
                      style={{ width: `${workoutProgress.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist de Aquecimento (Oculto no Modo Academia focado) */}
            {!gymMode && (
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${themeConfig.bgCard}`}>
                <div className="flex items-start sm:items-center gap-3">
                  <Flame className={`w-5 h-5 shrink-0 mt-0.5 sm:mt-0 ${warmupCompleted ? 'text-lime-400' : 'text-amber-400'}`} />
                  <div>
                    <h4 className="text-sm font-bold">Protocolo de Aquecimento & RIR 1–3</h4>
                    <p className={`text-xs ${themeConfig.textMuted}`}>
                      5 min de cardio leve (esteira/bike) + 1 a 3 séries progressivas leves no 1º exercício. Trabalhe deixando 1–3 repetições em reserva (RIR 1–3).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setWarmupCompleted(!warmupCompleted);
                    if (!warmupCompleted) showToast('Aquecimento concluído! Bom treino.');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border shrink-0 flex items-center gap-1.5 ${
                    warmupCompleted ? themeConfig.accentBadge : themeConfig.bgCardAlt
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {warmupCompleted ? 'Aquecimento Concluído' : 'Marcar Aquecimento'}
                </button>
              </div>
            )}

            {/* Navegador de Exercício Único se estiver no Modo Academia */}
            {gymMode && (
              <div className="flex items-center justify-between gap-2">
                <button
                  disabled={focusedExerciseIndex === 0}
                  onClick={() => setFocusedExerciseIndex(prev => Math.max(0, prev - 1))}
                  className={`px-4 py-3 rounded-2xl border font-bold text-sm flex items-center gap-2 disabled:opacity-40 ${themeConfig.bgCard}`}
                >
                  <ChevronLeft className="w-4 h-4" /> Exercício Anterior
                </button>
                <span className="text-sm font-black">
                  Exercício {focusedExerciseIndex + 1} de {currentWorkout.exercises.length}
                </span>
                <button
                  disabled={focusedExerciseIndex === currentWorkout.exercises.length - 1}
                  onClick={() => setFocusedExerciseIndex(prev => Math.min(currentWorkout.exercises.length - 1, prev + 1))}
                  className={`px-4 py-3 rounded-2xl border font-bold text-sm flex items-center gap-2 disabled:opacity-40 ${themeConfig.bgCard}`}
                >
                  Próximo Exercício <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* LISTA DE EXERCÍCIOS DO TREINO */}
            <div className="space-y-5">
              {currentWorkout.exercises
                .filter((_, idx) => !gymMode || idx === focusedExerciseIndex)
                .map((exercise, idx) => {
                  const actualIndex = gymMode ? focusedExerciseIndex : idx;
                  const allSetsDone = exercise.sets.every(s => s.completed);

                  return (
                    <div
                      key={exercise.id}
                      className={`p-5 sm:p-6 rounded-3xl border transition-all ${themeConfig.bgCard} ${
                        allSetsDone ? 'border-emerald-500/40' : ''
                      }`}
                    >
                      {/* Cabeçalho do Exercício */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${themeConfig.accentBadge}`}>
                              Exercício {actualIndex + 1} de {currentWorkout.exercises.length}
                            </span>
                            <span className={`text-xs font-medium ${themeConfig.textMuted}`}>
                              • {exercise.muscle}
                            </span>
                            {exercise.pairWith && (
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                                <Repeat className="w-3 h-3" /> {exercise.pairWith}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                            {exercise.name}
                            {allSetsDone && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                          </h3>
                          <p className={`text-xs sm:text-sm font-semibold mt-0.5 ${themeConfig.textMuted}`}>
                            Meta: <strong className="text-white">{exercise.targetSets} séries de {exercise.targetReps} repetições</strong> • Descanso sugerido: <strong className="text-white">{exercise.restLabel}</strong>
                          </p>
                        </div>

                        {/* Botões de Substituição e Instruções */}
                        <div className="flex items-center gap-2 self-start">
                          <button
                            onClick={() => setSubstituteModal({ workoutKey: currentWorkout.id, exercise })}
                            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${themeConfig.bgCardAlt}`}
                            title="Adaptar à academia disponível"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Substituir
                          </button>
                          <button
                            onClick={() => setInstructionModal(exercise)}
                            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${themeConfig.bgCardAlt}`}
                          >
                            <Info className="w-3.5 h-3.5" />
                            Execução
                          </button>
                          <button
                            onClick={() =>
                              setRestTimer({
                                active: true,
                                secondsLeft: exercise.restSeconds,
                                totalSeconds: exercise.restSeconds,
                                exerciseName: exercise.name
                              })
                            }
                            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${themeConfig.accentBadge}`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            {formatTime(exercise.restSeconds)}
                          </button>
                        </div>
                      </div>

                      {/* Banner Histórico da Última Execução + Inteligência de Progressão */}
                      <div className={`p-3.5 rounded-2xl border mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${themeConfig.bgCardAlt}`}>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs uppercase font-bold tracking-wider ${themeConfig.textMuted}`}>
                              Último treino:
                            </span>
                            <span className="text-xs sm:text-sm font-bold">
                              {exercise.lastSummary}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${themeConfig.accentText}`} />
                            <span className={exercise.progressionStatus === 'increased' || exercise.progressionStatus === 'ready' ? themeConfig.accentText : themeConfig.textMuted}>
                              {exercise.progressionNote}
                            </span>
                          </div>
                        </div>

                        {exercise.progressionStatus === 'ready' && (
                          <button
                            onClick={() => handleApproveProgression(currentWorkout.id, exercise.id, exercise.suggestedWeight)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 ${themeConfig.accentBg}`}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                            Subir para {exercise.suggestedWeight} kg
                          </button>
                        )}
                      </div>

                      {/* TABELA DE SÉRIES INTERATIVA */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`border-b text-[11px] uppercase tracking-wider ${themeConfig.textMuted} border-zinc-800`}>
                              <th className="py-2 px-2 w-14">Série</th>
                              <th className="py-2 px-2">Carga (kg)</th>
                              <th className="py-2 px-2">
                                {exercise.name.toLowerCase().includes('prancha') ? 'Tempo (seg)' : 'Repetições'}
                              </th>
                              <th className="py-2 px-2 hidden sm:table-cell">RIR (Reserva)</th>
                              <th className="py-2 px-2 text-right w-28">Concluída</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/50">
                            {exercise.sets.map(setItem => (
                              <tr
                                key={setItem.setNumber}
                                className={`transition-colors ${
                                  setItem.completed ? 'bg-emerald-500/10' : ''
                                }`}
                              >
                                <td className="py-3 px-2 font-black text-sm">
                                  #{setItem.setNumber}
                                </td>

                                {/* Controle de Carga */}
                                <td className="py-3 px-2">
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() =>
                                        handleUpdateSet(
                                          currentWorkout.id,
                                          exercise.id,
                                          setItem.setNumber,
                                          'weight',
                                          Math.max(0, +(Number(setItem.weight) - exercise.increment).toFixed(1))
                                        )
                                      }
                                      className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold ${themeConfig.bgCardAlt}`}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <input
                                      type="number"
                                      step="0.5"
                                      value={setItem.weight}
                                      onChange={e =>
                                        handleUpdateSet(
                                          currentWorkout.id,
                                          exercise.id,
                                          setItem.setNumber,
                                          'weight',
                                          e.target.value
                                        )
                                      }
                                      className={`w-16 sm:w-20 text-center font-black text-sm py-1.5 rounded-lg border bg-transparent ${themeConfig.bgCardAlt}`}
                                    />
                                    <button
                                      onClick={() =>
                                        handleUpdateSet(
                                          currentWorkout.id,
                                          exercise.id,
                                          setItem.setNumber,
                                          'weight',
                                          +(Number(setItem.weight) + exercise.increment).toFixed(1)
                                        )
                                      }
                                      className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold ${themeConfig.bgCardAlt}`}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </td>

                                {/* Controle de Repetições */}
                                <td className="py-3 px-2">
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() =>
                                        handleUpdateSet(
                                          currentWorkout.id,
                                          exercise.id,
                                          setItem.setNumber,
                                          'reps',
                                          Math.max(1, Number(setItem.reps) - 1)
                                        )
                                      }
                                      className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold ${themeConfig.bgCardAlt}`}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <input
                                      type="number"
                                      value={setItem.reps}
                                      onChange={e =>
                                        handleUpdateSet(
                                          currentWorkout.id,
                                          exercise.id,
                                          setItem.setNumber,
                                          'reps',
                                          e.target.value
                                        )
                                      }
                                      className={`w-14 sm:w-16 text-center font-black text-sm py-1.5 rounded-lg border bg-transparent ${themeConfig.bgCardAlt}`}
                                    />
                                    <button
                                      onClick={() =>
                                        handleUpdateSet(
                                          currentWorkout.id,
                                          exercise.id,
                                          setItem.setNumber,
                                          'reps',
                                          Number(setItem.reps) + 1
                                        )
                                      }
                                      className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold ${themeConfig.bgCardAlt}`}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </td>

                                {/* Controle RIR */}
                                <td className="py-3 px-2 hidden sm:table-cell">
                                  <select
                                    value={setItem.rir}
                                    onChange={e =>
                                      handleUpdateSet(
                                        currentWorkout.id,
                                        exercise.id,
                                        setItem.setNumber,
                                        'rir',
                                        e.target.value
                                      )
                                    }
                                    className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg border ${themeConfig.bgCardAlt}`}
                                  >
                                    <option value="1-2">RIR 1–2 (Ideal)</option>
                                    <option value="3">RIR 3 (Leve)</option>
                                    <option value="0">RIR 0 (Falha)</option>
                                  </select>
                                </td>

                                {/* Botão Check Concluir Série */}
                                <td className="py-3 px-2 text-right">
                                  <button
                                    onClick={() => handleToggleSetComplete(currentWorkout.id, exercise, setItem)}
                                    className={`px-4 py-2 rounded-xl font-black text-xs inline-flex items-center gap-1.5 transition-all ${
                                      setItem.completed
                                        ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                                        : `${themeConfig.bgCardAlt} border hover:border-lime-400`
                                    }`}
                                  >
                                    <Check className="w-4 h-4 stroke-[3]" />
                                    {setItem.completed ? 'Feito' : 'Marcar'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Card Complemento Cardio Pós-Treino + Botão Finalizar Sessão */}
            <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${themeConfig.bgCard}`}>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-emerald-400">Complemento da Ficha</span>
                <h4 className="text-lg font-black">Cardio Pós-Musculação (8–10 min moderado)</h4>
                <p className={`text-xs ${themeConfig.textMuted}`}>
                  Esteira inclinada, bicicleta ou elíptico se couber no tempo e não prejudicar a recuperação.
                </p>
              </div>
              <button
                onClick={handleFinishWorkout}
                className={`w-full sm:w-auto py-4 px-8 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl ${themeConfig.accentBg}`}
              >
                <CheckCircle2 className="w-5 h-5" />
                FINALIZAR {currentWorkout.name} E SALVAR
              </button>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 3: EVOLUÇÃO & AVALIAÇÃO CORPORAL
           ========================================== */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            {/* Sub-navegação da Evolução */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'recomp', label: 'Painel de Evolução & Peso', icon: TrendingUp },
                { id: 'loads', label: 'Histórico de Cargas & Volume', icon: Dumbbell },
                { id: 'assessment', label: 'Avaliação Corporal & Fotos', icon: Camera },
                { id: 'calendar', label: 'Resumo Diário', icon: Calendar }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setEvolutionSubTab(tab.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all ${
                      evolutionSubTab === tab.id ? themeConfig.accentBg : themeConfig.bgCard
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* SUB-ABA 3.1: PAINEL DE RECOMPOSIÇÃO CORPORAL */}
            {evolutionSubTab === 'recomp' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`p-5 rounded-3xl border ${themeConfig.bgCard}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Peso Inicial</span>
                    <div className="text-2xl font-black mt-1">
                      {Number(userProfile.initialWeight) > 0 ? `${Number(userProfile.initialWeight).toFixed(1)} kg` : '—'}
                    </div>
                    <span className="text-xs text-zinc-500">Ponto de partida</span>
                  </div>
                  <div className={`p-5 rounded-3xl border ${themeConfig.bgCard}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Peso Atual (Média)</span>
                    <div className={`text-2xl font-black mt-1 ${themeConfig.accentText}`}>
                      {Number(userProfile.currentWeight) > 0 ? `${Number(userProfile.currentWeight).toFixed(1)} kg` : '—'}
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {Number(userProfile.initialWeight) > 0 && Number(userProfile.currentWeight) > 0 ? `${weightDiff} kg de diferença` : 'Sem histórico registrado'}
                    </span>
                  </div>
                  <div className={`p-5 rounded-3xl border ${themeConfig.bgCard}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Circunferência Abdominal</span>
                    <div className="text-2xl font-black mt-1">
                      {Number(userProfile.currentWaist) > 0 ? `${Number(userProfile.currentWaist).toFixed(1)} cm` : '—'}
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {Number(userProfile.initialWaist) > 0 && Number(userProfile.currentWaist) > 0 ? `${waistDiff} cm de diferença` : 'Sem histórico registrado'}
                    </span>
                  </div>
                  <div className={`p-5 rounded-3xl border ${themeConfig.bgCard}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Meta de Peso</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        step="0.5"
                        value={userProfile.goalWeight}
                        onChange={e => setUserProfile(prev => ({ ...prev, goalWeight: parseFloat(e.target.value) || 0 }))}
                        className={`w-20 text-xl font-black px-2 py-0.5 rounded-lg border bg-transparent ${themeConfig.bgCardAlt}`}
                      />
                      <span className="text-sm font-bold">kg</span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {Number(userProfile.currentWeight) > 0 && Number(userProfile.goalWeight) > 0
                        ? `Faltam ${(Number(userProfile.currentWeight) - Number(userProfile.goalWeight)).toFixed(1)} kg`
                        : 'Preencha peso atual e meta'}
                    </span>
                  </div>
                </div>

                {/* Gráfico Visual Duplo: Peso Corporal + Circunferência Abdominal + Força */}
                <div className={`p-6 rounded-3xl border ${themeConfig.bgCard}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                        Avaliação Conjunta (Peso • Medidas • Desempenho)
                      </span>
                      <h3 className="text-xl font-black">Curva de Recomposição Corporal</h3>
                      <p className={`text-xs ${themeConfig.textMuted}`}>
                        Acompanhamento de pesagens médias semanais e redução abdominal enquanto o índice de carga sobe.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-lime-400 inline-block" /> Peso (kg)
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" /> Abdômen (cm)
                      </span>
                    </div>
                  </div>

                  {/* Gráfico SVG Responsivo */}
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-[520px] h-64 flex items-end justify-between gap-4 pt-8 pb-4 px-6 border-b border-zinc-800 relative">
                      {bodyHistory.length === 0 ? (
                        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${themeConfig.textMuted}`}>
                          <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-sm font-bold">Nenhuma avaliação registrada</p>
                          <p className="text-xs mt-1">Registre peso e medidas para acompanhar sua evolução.</p>
                        </div>
                      ) : bodyHistory.map((item, idx) => {
                        const weightHeight = Math.max(30, Math.min(100, ((item.weight - 82) / 14) * 100));
                        const waistHeight = Math.max(30, Math.min(100, ((item.waist - 85) / 15) * 100));
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full flex items-end justify-center gap-2 h-44">
                              {/* Barra Peso */}
                              <div className="flex flex-col items-center">
                                <span className="text-[11px] font-black text-lime-400 mb-1">{item.weight}kg</span>
                                <div
                                  className="w-7 sm:w-9 rounded-t-xl bg-lime-400/90 transition-all duration-500"
                                  style={{ height: `${weightHeight * 1.4}px` }}
                                />
                              </div>
                              {/* Barra Abdômen */}
                              <div className="flex flex-col items-center">
                                <span className="text-[11px] font-bold text-cyan-400 mb-1">{item.waist}cm</span>
                                <div
                                  className="w-7 sm:w-9 rounded-t-xl bg-cyan-400/80 transition-all duration-500"
                                  style={{ height: `${waistHeight * 1.4}px` }}
                                />
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-xs font-bold block">{item.date}</span>
                              <span className={`text-[10px] ${themeConfig.textMuted}`}>{item.fullDate}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                      <strong>Como acompanhar o Peso Corporal:</strong> Faça a média de 3 a 7 pesagens por semana em condições semelhantes (ao acordar, após ir ao banheiro).
                    </div>
                    <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                      <strong>Como acompanhar a Circunferência Abdominal:</strong> Meça a cada 2–4 semanas sempre no mesmo ponto (linha umbilical) e sem comprimir a fita.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-ABA 3.2: HISTÓRICO DE CARGAS POR EXERCÍCIO */}
            {evolutionSubTab === 'loads' && (
              <div className={`p-6 rounded-3xl border space-y-6 ${themeConfig.bgCard}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black">Evolução de Cargas e Alerta de Estagnação</h3>
                    <p className={`text-xs ${themeConfig.textMuted}`}>
                      Selecione qualquer exercício da sua ficha A, B ou C para inspecionar a progressão.
                    </p>
                  </div>
                  <select
                    value={selectedExerciseFilter}
                    onChange={e => setSelectedExerciseFilter(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                  >
                    {Object.values(workouts).flatMap(w =>
                      w.exercises.map(ex => (
                        <option key={ex.id} value={ex.name}>
                          [{w.name}] {ex.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Exercício Selecionado</span>
                    <div className="text-lg font-black mt-1">{selectedExerciseFilter}</div>
                    <span className="text-xs text-lime-400">
                      {selectedExerciseLogs.length > 0 ? `${selectedExerciseLogs.length} sessões registradas` : 'Sem histórico registrado'}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Controle de Fadiga / RIR</span>
                    <div className="text-lg font-black mt-1">
                      {selectedExerciseLogs[0]?.date || 'Aguardando registro'}
                    </div>
                    <span className="text-xs text-emerald-400">
                      {selectedExerciseLogs[0] ? 'Sessão mais recente' : 'Finalize uma sessão para acompanhar'}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                    <span className={`text-xs ${themeConfig.textMuted}`}>Volume Semanal Total</span>
                    <div className="text-lg font-black mt-1">{weeklyWorkoutVolume.toLocaleString('pt-BR')} kg</div>
                    <span className="text-xs text-zinc-400">Volume registrado nos últimos 7 dias</span>
                  </div>
                </div>

                {/* Linha do tempo do exercício */}
                <div className="space-y-2.5">
                  {selectedExerciseLogs.length > 0 ? selectedExerciseLogs.map(log => (
                    <div key={`${log.id}-${log.exercise.id}`} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${themeConfig.bgCardAlt}`}>
                      <div>
                        <span className="text-xs font-bold text-lime-400">{log.workout} • {log.date}</span>
                        <p className="text-sm font-bold">{log.highlight}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        {log.completedSets.map(set => (
                          <span key={set.setNumber} className={`text-xs px-2.5 py-1 rounded-lg border ${themeConfig.accentBadge}`}>
                            S{set.setNumber}: {set.weight} kg × {set.reps}
                          </span>
                        ))}
                      </div>
                    </div>
                  )) : (
                    <div className={`p-5 rounded-2xl border text-sm ${themeConfig.bgCardAlt} ${themeConfig.textMuted}`}>
                      Nenhuma série concluída registrada para este exercício ainda.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-ABA 3.3: AVALIAÇÃO CORPORAL & FOTOS */}
            {evolutionSubTab === 'assessment' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Formulário de Nova Avaliação */}
                <form onSubmit={handleAddBodyAssessment} className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
                  <h3 className="text-lg font-black">Registrar Medidas Corporais</h3>
                  <p className={`text-xs ${themeConfig.textMuted}`}>
                    Registre o peso de 3–7x/semana e a circunferência abdominal a cada 2–4 semanas.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Peso Corporal (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={newAssessment.weight}
                        onChange={e => setNewAssessment({ ...newAssessment, weight: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border font-bold text-sm ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Abdômen (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={newAssessment.waist}
                        onChange={e => setNewAssessment({ ...newAssessment, waist: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border font-bold text-sm ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Peitoral (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newAssessment.chest}
                        onChange={e => setNewAssessment({ ...newAssessment, chest: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border font-bold text-sm ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Braço Contraído (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newAssessment.arm}
                        onChange={e => setNewAssessment({ ...newAssessment, arm: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border font-bold text-sm ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Observação da Avaliação</label>
                    <input
                      type="text"
                      value={newAssessment.note}
                      onChange={e => setNewAssessment({ ...newAssessment, note: e.target.value })}
                      placeholder="Ex: Em jejum pela manhã"
                      className={`w-full px-3 py-2 rounded-xl border text-sm ${themeConfig.bgCardAlt}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-black text-sm ${themeConfig.accentBg}`}
                  >
                    Salvar Registro Corporal
                  </button>
                </form>

                {/* Comparação de Fotografias (A cada 4 semanas) */}
                <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black">Comparativo Visual de Fotos</h3>
                      <p className={`text-xs ${themeConfig.textMuted}`}>
                        Frequência recomendada: a cada 4 semanas, sempre na mesma iluminação e posição.
                      </p>
                    </div>
                    <Camera className={`w-6 h-6 ${themeConfig.accentText}`} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl border text-center space-y-2 ${themeConfig.bgCardAlt}`}>
                      <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-700 text-zinc-200">
                        Semana 1 • {userProfile.initialWeight ? `${userProfile.initialWeight} kg` : 'Sem registro'}
                      </span>
                      <div className="h-44 rounded-xl bg-zinc-900/70 border border-dashed border-zinc-700 flex flex-col items-center justify-center p-4">
                        <User className="w-16 h-16 text-zinc-600 mb-2" />
                        <span className="text-xs font-semibold text-zinc-400">Foto inicial não registrada</span>
                        <span className="text-[11px] text-zinc-500">Sem medidas registradas</span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl border text-center space-y-2 ${themeConfig.bgCardAlt}`}>
                      <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${themeConfig.accentBadge}`}>
                        Registro atual{userProfile.currentWeight ? ` • ${userProfile.currentWeight} kg` : ''}
                      </span>
                      <div className="h-44 rounded-xl bg-zinc-900/70 border border-dashed border-lime-400/40 flex flex-col items-center justify-center p-4">
                        <User className={`w-16 h-16 mb-2 ${themeConfig.accentText}`} />
                        <span className="text-xs font-semibold">Silhueta atual</span>
                        <button
                          onClick={() => showToast('Simulação de captura de foto de 4 semanas adicionada!')}
                          className={`mt-2 px-3 py-1 rounded-lg text-[11px] font-bold ${themeConfig.accentBg}`}
                        >
                          + Atualizar Foto 4 Semanas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-ABA 3.4: CALENDÁRIO & HISTÓRICO DE SESSÕES */}
            {evolutionSubTab === 'calendar' && (
              <div className="space-y-4">
                <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${themeConfig.bgCard}`}>
                  <div>
                    <h3 className="text-xl font-black">Resumo dos treinos por dia</h3>
                    <p className={`text-sm mt-1 ${themeConfig.textMuted}`}>Escolha uma data para consultar as sessões realizadas.</p>
                  </div>
                  <label className={`flex items-center gap-3 px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}>
                    <Calendar className={`w-4 h-4 ${themeConfig.accentText}`} />
                    <span>Data</span>
                    <input
                      type="date"
                      value={selectedWorkoutSummaryDate}
                      onChange={e => setSelectedWorkoutSummaryDate(e.target.value)}
                      className="bg-transparent text-sm outline-none"
                      aria-label="Selecionar data do resumo do treino"
                    />
                  </label>
                </div>

                {selectedDayWorkoutLogs.length > 0 ? selectedDayWorkoutLogs.map(log => (
                  <article key={log.id} className={`p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black">{log.workout}</h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">{log.status}</span>
                        </div>
                        <p className={`text-xs mt-1 ${themeConfig.textMuted}`}>{log.date} • {log.highlight}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs font-bold">
                        <span>Tempo: {log.duration}</span>
                        <span className={themeConfig.accentText}>Volume: {log.volume}</span>
                      </div>
                    </div>

                    {log.exercises?.length > 0 ? (
                      <div className="divide-y divide-zinc-800">
                        {log.exercises.map((exercise, index) => {
                          const completedSets = exercise.sets.filter(set => set.completed);
                          return (
                            <div key={`${log.id}-${exercise.name}-${index}`} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <span className="text-sm font-bold">{exercise.name}</span>
                              <span className={`text-xs sm:text-right ${themeConfig.textMuted}`}>
                                {completedSets.length > 0
                                  ? completedSets.map(set => `S${set.setNumber}: ${set.weight} kg × ${set.reps}`).join(' • ')
                                  : 'Nenhuma série marcada como concluída'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className={`text-sm ${themeConfig.textMuted}`}>Este registro não contém o detalhamento dos exercícios.</p>
                    )}
                  </article>
                )) : (
                  <div className={`p-8 rounded-3xl border text-center ${themeConfig.bgCard}`}>
                    <Calendar className={`w-8 h-8 mx-auto mb-2 ${themeConfig.textMuted}`} />
                    <p className="font-bold">Nenhum treino registrado em {formatHabitDate(selectedWorkoutSummaryDate)}</p>
                    <p className={`text-sm mt-1 ${themeConfig.textMuted}`}>Os treinos finalizados aparecerão aqui com duração, volume e séries.</p>
                  </div>
                )}

                {undatedWorkoutLogs.length > 0 && (
                  <div className={`p-4 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                    <h4 className="text-sm font-bold">Registros antigos sem data</h4>
                    <div className="mt-2 space-y-2">
                      {undatedWorkoutLogs.map(log => (
                        <p key={log.id} className={`text-xs ${themeConfig.textMuted}`}>
                          {log.workout} • {log.duration} • {log.volume}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            ABA 4: HÁBITOS (ÁGUA, SONO, NUTRIÇÃO, CARDIO)
           ========================================== */}
        {activeTab === 'habits' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl border ${themeConfig.bgCard}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Hábitos do dia</h2>
                  <p className={`text-sm mt-1 capitalize ${themeConfig.textMuted}`}>
                    Registrando hábitos de {new Date(`${selectedHabitDate}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <label className={`flex items-center gap-3 px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}>
                  <Calendar className={`w-4 h-4 ${themeConfig.accentText}`} />
                  <span>Data</span>
                  <input
                    type="date"
                    value={selectedHabitDate}
                    onChange={e => e.target.value && selectHabitDate(e.target.value)}
                    className="bg-transparent text-sm outline-none"
                    aria-label="Selecionar data dos hábitos"
                  />
                </label>
              </div>
              <p className={`mt-4 text-xs ${themeConfig.textMuted}`}>
                Suas alterações são salvas automaticamente por dia. Escolha uma data para consultar ou registrar hábitos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Hidratação */}
              <div className={`p-6 rounded-3xl border flex flex-col justify-between ${themeConfig.bgCard}`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-cyan-400">Hidratação Diária</span>
                    <Droplets className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black">
                    {(habits.waterMl / 1000).toFixed(2)} L
                    <span className={`text-sm font-normal ml-2 ${themeConfig.textMuted}`}>
                      / {habits.waterGoalMl > 0 ? `${(habits.waterGoalMl / 1000).toFixed(2)} L` : 'meta não definida'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden my-4">
                    <div
                      className="h-full bg-cyan-400 transition-all"
                      style={{ width: `${habits.waterGoalMl > 0 ? Math.min(100, (habits.waterMl / habits.waterGoalMl) * 100) : 0}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, waterMl: Math.max(0, prev.waterMl - 250) }))}
                    className={`py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                    aria-label="Diminuir água em 250 ml"
                  >
                    -250 ml
                  </button>
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, waterMl: prev.waterMl + 250 }))}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                  >
                    +250 ml
                  </button>
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, waterMl: Math.max(0, prev.waterMl - 500) }))}
                    className={`py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                    aria-label="Diminuir água em 500 ml"
                  >
                    -500 ml
                  </button>
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, waterMl: prev.waterMl + 500 }))}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-black"
                  >
                    +500 ml
                  </button>
                </div>
              </div>

              {/* Passos e Gasto Diário (NEAT) */}
              <div className={`p-6 rounded-3xl border flex flex-col justify-between ${themeConfig.bgCard}`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-amber-400">Atividade Diária (Passos)</span>
                    <Footprints className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black">
                    {habits.steps.toLocaleString('pt-BR')}
                    <span className={`text-sm font-normal ml-2 ${themeConfig.textMuted}`}>
                      / {habits.stepsGoal.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <p className={`text-xs my-3 ${themeConfig.textMuted}`}>
                    Caminhadas e aumento gradual da atividade diária ajudam a elevar o gasto energético sem gerar fadiga muscular.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, steps: Math.max(0, prev.steps - 1000) }))}
                    className={`py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                    aria-label="Diminuir 1.000 passos"
                  >
                    -1.000 passos
                  </button>
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, steps: prev.steps + 1000 }))}
                    className={`py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                    aria-label="Registrar 1.000 passos"
                  >
                    +1.000 passos
                  </button>
                </div>
              </div>

              {/* Sono e Recuperação */}
              <div className={`p-6 rounded-3xl border flex flex-col justify-between ${themeConfig.bgCard}`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase text-indigo-400">Sono & Recuperação</span>
                    <Moon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black">{habits.sleepHours > 0 ? `${habits.sleepHours} horas` : 'Sem registro'}</div>
                  <p className={`text-xs my-3 ${themeConfig.textMuted}`}>
                    Se a recuperação ficar ruim por várias sessões, o sistema sugere reduzir temporariamente volume/carga.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, sleepHours: Math.max(0, Number((prev.sleepHours - 0.5).toFixed(1))) }))}
                    disabled={habits.sleepHours <= 0}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl border text-xs font-bold disabled:opacity-40 ${themeConfig.bgCardAlt}`}
                    aria-label="Diminuir sono em meia hora"
                    title="Diminuir 30 minutos"
                  >
                    <Minus className="w-3.5 h-3.5" /> 0,5h
                  </button>
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, sleepHours: 0 }))}
                    disabled={habits.sleepHours <= 0}
                    className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl border text-xs font-bold disabled:opacity-40 ${themeConfig.bgCardAlt}`}
                    aria-label="Zerar horas de sono"
                    title="Limpar registro de sono"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Zerar
                  </button>
                </div>
                <div className="flex gap-2">
                  {[6.0, 7.0, 7.5, 8.0].map(h => (
                    <button
                      key={h}
                      onClick={() => updateHabits(prev => ({ ...prev, sleepHours: h }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        habits.sleepHours === h ? themeConfig.accentBg : themeConfig.bgCardAlt
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrição & Cardio Pós-Treino */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border space-y-3 ${themeConfig.bgCard}`}>
                <div className="flex items-center gap-2">
                  <Utensils className={`w-5 h-5 ${themeConfig.accentText}`} />
                  <h3 className="font-black text-lg">Alimentação & Meta de Proteína</h3>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, proteinGoalHit: !prev.proteinGoalHit }))}
                    className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left ${themeConfig.bgCardAlt}`}
                  >
                    <span className="text-sm font-semibold">Meta diária de Proteína atingida (~160–180g)</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${habits.proteinGoalHit ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-700'}`}>
                      {habits.proteinGoalHit ? 'Concluído ✓' : 'Pendente'}
                    </span>
                  </button>
                  <button
                    onClick={() => updateHabits(prev => ({ ...prev, calorieDeficitHit: !prev.calorieDeficitHit }))}
                    className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left ${themeConfig.bgCardAlt}`}
                  >
                    <span className="text-sm font-semibold">Déficit calórico sustentável respeitado hoje</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${habits.calorieDeficitHit ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-700'}`}>
                      {habits.calorieDeficitHit ? 'Concluído ✓' : 'Pendente'}
                    </span>
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border space-y-3 ${themeConfig.bgCard}`}>
                <div className="flex items-center gap-2">
                  <Flame className={`w-5 h-5 ${themeConfig.accentText}`} />
                  <h3 className="font-black text-lg">Cardio Complementar Pós-Musculação</h3>
                </div>
                <p className={`text-xs ${themeConfig.textMuted}`}>
                  Meta oficial da ficha: 8–10 minutos de cardio moderado após a musculação (esteira inclinada, bicicleta ou elíptico).
                </p>
                <button
                  onClick={() => updateHabits(prev => ({ ...prev, postWorkoutCardioDone: !prev.postWorkoutCardioDone }))}
                  className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left ${themeConfig.bgCardAlt}`}
                >
                  <span className="text-sm font-semibold">{habits.cardioType || 'Cardio complementar'}</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${habits.postWorkoutCardioDone ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-700'}`}>
                    {habits.postWorkoutCardioDone ? 'Realizado ✓' : 'Marcar'}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section className={`p-6 rounded-3xl border ${themeConfig.bgCard}`} aria-label="Calendário de hábitos">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-black">Calendário</h3>
                    <p className={`text-xs capitalize ${themeConfig.textMuted}`}>{habitCalendarLabel}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveHabitCalendar(-1)}
                      className={`p-2 rounded-lg border ${themeConfig.bgCardAlt}`}
                      aria-label="Mês anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveHabitCalendar(1)}
                      className={`p-2 rounded-lg border ${themeConfig.bgCardAlt}`}
                      aria-label="Próximo mês"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(day => (
                    <span key={day} className={`py-2 text-[10px] font-bold uppercase ${themeConfig.textMuted}`}>{day}</span>
                  ))}
                  {habitCalendarCells.map((day, index) => {
                    if (!day) return <span key={`empty-${index}`} className="aspect-square" />;
                    const date = `${habitCalendarMonth}-${String(day).padStart(2, '0')}`;
                    const isSelected = date === selectedHabitDate;
                    const hasRecord = Boolean(habitHistory[date]);
                    return (
                      <button
                        key={date}
                        onClick={() => selectHabitDate(date)}
                        aria-pressed={isSelected}
                        aria-label={`${day} de ${habitCalendarLabel}${hasRecord ? ', com registro' : ', sem registro'}`}
                        className={`relative aspect-square rounded-xl text-sm font-bold transition-colors ${
                          isSelected ? themeConfig.accentBg : `${themeConfig.bgCardAlt} hover:opacity-80`
                        }`}
                      >
                        {day}
                        {hasRecord && (
                          <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-zinc-950' : 'bg-emerald-400'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className={`mt-3 text-[11px] ${themeConfig.textMuted}`}>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5" />Dia com hábitos registrados
                </p>
              </section>

              <section className={`p-6 rounded-3xl border ${themeConfig.bgCard}`} aria-label="Resumo dos hábitos do dia selecionado">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg font-black">Resumo do dia</h3>
                    <p className={`text-sm ${themeConfig.textMuted}`}>{formatHabitDate(selectedHabitDate)}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${habitHistory[selectedHabitDate] ? 'bg-emerald-500/15 text-emerald-400' : themeConfig.bgCardAlt}`}>
                    {habitHistory[selectedHabitDate] ? 'Registrado' : 'Sem registro'}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-3"><span className={themeConfig.textMuted}>Água</span><strong>{(habits.waterMl / 1000).toFixed(2)} L{habits.waterGoalMl > 0 ? ` / ${(habits.waterGoalMl / 1000).toFixed(2)} L` : ''}</strong></div>
                  <div className="flex justify-between gap-3"><span className={themeConfig.textMuted}>Passos</span><strong>{habits.steps.toLocaleString('pt-BR')}</strong></div>
                  <div className="flex justify-between gap-3"><span className={themeConfig.textMuted}>Sono</span><strong>{habits.sleepHours > 0 ? `${habits.sleepHours} horas` : '—'}</strong></div>
                  <div className="flex justify-between gap-3"><span className={themeConfig.textMuted}>Meta de proteína</span><strong>{habits.proteinGoalHit ? 'Atingida' : 'Pendente'}</strong></div>
                  <div className="flex justify-between gap-3"><span className={themeConfig.textMuted}>Déficit calórico</span><strong>{habits.calorieDeficitHit ? 'Atingido' : 'Pendente'}</strong></div>
                  <div className="flex justify-between gap-3"><span className={themeConfig.textMuted}>Cardio</span><strong>{habits.postWorkoutCardioDone ? 'Realizado' : 'Pendente'}</strong></div>
                </div>
                <div className={`mt-5 pt-4 border-t border-zinc-800 text-xs font-bold ${themeConfig.accentText}`}>
                  {habitCompletionCount} de 6 hábitos com registro
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ==========================================
            ABA 5: BIBLIOTECA, PERFIL & CONFIGURAÇÕES
           ========================================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* SEÇÃO 1: CRIAR / EDITAR PERFIL & DADOS ANTROPOMÉTRICOS COMPLETOS */}
            <div className={`p-6 rounded-3xl border space-y-6 ${themeConfig.bgCard}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${themeConfig.accentBg}`}>
                    <Ruler className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${themeConfig.accentText}`}>
                      Ficha Antropométrica & Biometria
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black">
                      Perfil do Atleta & Medidas Corporais
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setResetModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Resetar Dados
                  </button>
                  <button
                    onClick={(e) => handleSaveProfileAndAnthropometry(e, true)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg ${themeConfig.accentBg}`}
                  >
                    <Save className="w-4 h-4" />
                    Salvar Perfil & Registrar Avaliação
                  </button>
                </div>
              </div>

              {/* Resumo Automático de Composição Corporal (Calculado em Tempo Real) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                  <span className={`text-[11px] block ${themeConfig.textMuted}`}>IMC Atual</span>
                  <span className="text-xl font-black">{anthropometrics.bmi ?? '—'}{anthropometrics.bmi !== null ? ' kg/m²' : ''}</span>
                  <span className="text-[10px] text-lime-400 font-semibold block truncate">
                    {anthropometrics.bmiCategory}
                  </span>
                </div>
                <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                  <span className={`text-[11px] block ${themeConfig.textMuted}`}>% Gordura (BF)</span>
                  <span className={`text-xl font-black ${themeConfig.accentText}`}>{anthropometrics.bodyFat === null ? '—' : `${anthropometrics.bodyFat}%`}</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {anthropometrics.bodyFat === null
                      ? 'Informe sexo, altura, abdômen e pescoço; quadril se feminino'
                      : 'Estimativa pela fórmula US Navy'}
                  </span>
                </div>
                <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                  <span className={`text-[11px] block ${themeConfig.textMuted}`}>Massa Magra</span>
                  <span className="text-xl font-black text-emerald-400">{anthropometrics.leanMassKg === null ? '—' : `${anthropometrics.leanMassKg} kg`}</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {anthropometrics.leanMassKg === null ? 'Informe peso atual e percentual de gordura' : 'Músculos + ossos'}
                  </span>
                </div>
                <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                  <span className={`text-[11px] block ${themeConfig.textMuted}`}>Massa Gorda</span>
                  <span className="text-xl font-black text-amber-400">{anthropometrics.fatMassKg === null ? '—' : `${anthropometrics.fatMassKg} kg`}</span>
                  <span className="text-[10px] text-zinc-400 block">Estoque Adiposo</span>
                </div>
                <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                  <span className={`text-[11px] block ${themeConfig.textMuted}`}>Cintura/Estatura</span>
                  <span className="text-xl font-black">{anthropometrics.whtr ?? '—'}</span>
                  <span className="text-[10px] text-cyan-400 font-semibold block">{anthropometrics.whtrStatus}</span>
                </div>
                <div className={`p-3.5 rounded-2xl border ${themeConfig.bgCardAlt}`}>
                  <span className={`text-[11px] block ${themeConfig.textMuted}`}>Metabolismo Basal</span>
                  <span className="text-xl font-black">{anthropometrics.bmr === null ? '—' : `${anthropometrics.bmr} kcal`}</span>
                  <span className="text-[10px] text-zinc-400 block">Água: {anthropometrics.recommendedWaterMl === null ? '—' : `${anthropometrics.recommendedWaterMl} ml`}</span>
                </div>
              </div>

              {/* Formulário Completo Dividido em Blocos */}
              <form onSubmit={(e) => handleSaveProfileAndAnthropometry(e, true)} className="space-y-6">
                {/* Bloco 1: Dados Pessoais & Perfil */}
                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                    <User className={`w-4 h-4 ${themeConfig.accentText}`} />
                    1. Dados do Perfil & Objetivo
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold block mb-1">Nome / Apelido</label>
                      <input
                        type="text"
                        placeholder="Ex: Carlos Silva"
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Idade (anos)</label>
                      <input
                        type="number"
                        value={profileForm.age}
                        onChange={e => setProfileForm({ ...profileForm, age: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Sexo Biológico</label>
                      <select
                        value={profileForm.sex}
                        onChange={e => setProfileForm({ ...profileForm, sex: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      >
                        <option value="" disabled>Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Experiência</label>
                      <select
                        value={profileForm.experience}
                        onChange={e => setProfileForm({ ...profileForm, experience: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      >
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bloco 2: Medidas Básicas (Peso e Altura) */}
                <div className="space-y-3 pt-2 border-t border-zinc-800/60">
                  <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                    <Scale className={`w-4 h-4 ${themeConfig.accentText}`} />
                    2. Massa Corporal & Estatura
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Altura (cm)</label>
                      <input
                        type="number"
                        step="1"
                        value={profileForm.heightCm}
                        onChange={e => setProfileForm({ ...profileForm, heightCm: e.target.value, height: +(Number(e.target.value) / 100).toFixed(2) })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Peso Inicial (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.initialWeight}
                        onChange={e => setProfileForm({ ...profileForm, initialWeight: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1 text-lime-400">Peso Atual (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.currentWeight}
                        onChange={e => setProfileForm({ ...profileForm, currentWeight: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black border-lime-400/50 ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Meta de Peso (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.goalWeight}
                        onChange={e => setProfileForm({ ...profileForm, goalWeight: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs font-bold block mb-1">% Gordura Manual (Opcional)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Auto (Marinha)"
                        value={profileForm.manualBodyFat}
                        onChange={e => setProfileForm({ ...profileForm, manualBodyFat: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bloco 3: Perimetria / Circunferências de Tronco */}
                <div className="space-y-3 pt-2 border-t border-zinc-800/60">
                  <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                    <Calculator className={`w-4 h-4 ${themeConfig.accentText}`} />
                    3. Perimetria do Tronco (cm)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Abdômen Inicial</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.initialWaist}
                        onChange={e => setProfileForm({ ...profileForm, initialWaist: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1 text-lime-400">Abdômen Atual</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.currentWaist}
                        onChange={e => setProfileForm({ ...profileForm, currentWaist: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-black border-lime-400/50 ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Pescoço (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.neck}
                        onChange={e => setProfileForm({ ...profileForm, neck: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Tórax / Peitoral</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.chest}
                        onChange={e => setProfileForm({ ...profileForm, chest: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Ombros (Deltoides)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.shoulder}
                        onChange={e => setProfileForm({ ...profileForm, shoulder: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Quadril (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.hip}
                        onChange={e => setProfileForm({ ...profileForm, hip: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bloco 4: Perimetria de Membros Superiores e Inferiores (Simetria Direita / Esquerda) */}
                <div className="space-y-3 pt-2 border-t border-zinc-800/60">
                  <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                    <Dumbbell className={`w-4 h-4 ${themeConfig.accentText}`} />
                    4. Membros Superiores e Inferiores — Simetria Direita / Esquerda (cm)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    <div>
                      <label className="text-xs font-bold block mb-1">Braço Contr. (Dir)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.armContractedRight}
                        onChange={e => setProfileForm({ ...profileForm, armContractedRight: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Braço Contr. (Esq)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.armContractedLeft}
                        onChange={e => setProfileForm({ ...profileForm, armContractedLeft: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Antebraço (Dir/Esq)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.forearmRight}
                        onChange={e => setProfileForm({ ...profileForm, forearmRight: e.target.value, forearmLeft: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Coxa Média (Dir)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.thighRight}
                        onChange={e => setProfileForm({ ...profileForm, thighRight: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Panturrilha (Dir)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileForm.calfRight}
                        onChange={e => setProfileForm({ ...profileForm, calfRight: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800">
                  <p className={`text-xs ${themeConfig.textMuted}`}>
                    Todos os dados ficam salvos automaticamente no seu dispositivo e atualizam os gráficos de evolução.
                  </p>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={(e) => handleSaveProfileAndAnthropometry(e, false)}
                      className={`flex-1 sm:flex-initial px-4 py-3 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                    >
                      Apenas Atualizar Perfil
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 ${themeConfig.accentBg}`}
                    >
                      <Save className="w-4 h-4" />
                      Salvar & Adicionar ao Histórico
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Personalização da Identidade do Aplicativo */}
            <div className={`p-6 rounded-3xl border space-y-5 ${themeConfig.bgCard}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold uppercase ${themeConfig.accentText}`}>Personalização</span>
                  <h2 className="text-xl font-black">Identidade Visual & Nome do Aplicativo</h2>
                </div>
                <Sliders className={`w-6 h-6 ${themeConfig.accentText}`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Escolha do Nome */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">
                    Nome do seu Aplicativo
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {['FULL BODY 3X', 'TRINCA 3X', 'EVOLUI – Fitness Tracker'].map(name => (
                      <button
                        key={name}
                        onClick={() => {
                          setAppName(name);
                          showToast(`Nome do app alterado para ${name}`);
                        }}
                        className={`p-3 rounded-xl border text-left font-bold text-sm flex items-center justify-between ${
                          appName === name ? `${themeConfig.accentBorder} ${themeConfig.bgCardAlt}` : themeConfig.bgCardAlt
                        }`}
                      >
                        <span>{name}</span>
                        {appName === name && <Check className={`w-4 h-4 ${themeConfig.accentText}`} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escolha do Tema */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider block mb-2">
                    Estilo Visual Preferido
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'dark', name: 'Dark Premium – Preto, Grafite e Verde-Limão' },
                      { id: 'clean', name: 'Clean – Branco, Cinza e Azul' },
                      { id: 'sport', name: 'Sport – Preto, Vermelho e Branco' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`p-3 rounded-xl border text-left font-bold text-sm flex items-center justify-between ${
                          theme === t.id ? `${themeConfig.accentBorder} ${themeConfig.bgCardAlt}` : themeConfig.bgCardAlt
                        }`}
                      >
                        <span>{t.name}</span>
                        {theme === t.id && <Check className={`w-4 h-4 ${themeConfig.accentText}`} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exportar Relatório & Backup */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-3">
                <button
                  onClick={() => setReportModalOpen(true)}
                  className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 ${themeConfig.accentBg}`}
                >
                  <FileText className="w-4 h-4" />
                  Visualizar / Exportar Relatório de Evolução
                </button>
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ userProfile, workouts, bodyHistory, sessionLogs, habits, selectedHabitDate, habitHistory }, null, 2));
                    const dlAnchor = document.createElement('a');
                    dlAnchor.setAttribute("href", dataStr);
                    dlAnchor.setAttribute("download", "backup_full_body_3x.json");
                    dlAnchor.click();
                    showToast('Backup JSON exportado com sucesso!');
                  }}
                  className={`px-5 py-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${themeConfig.bgCardAlt}`}
                >
                  <Download className="w-4 h-4" />
                  Baixar Backup Completo (JSON)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-5 py-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${themeConfig.bgCardAlt} hover:border-lime-400`}
                >
                  <Upload className="w-4 h-4" />
                  Restaurar / Importar Backup (JSON)
                </button>
              </div>
            </div>

            {/* Biblioteca Completa dos 24 Exercícios da Ficha */}
            <div className={`p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
              <div className="flex items-center gap-2">
                <BookOpen className={`w-5 h-5 ${themeConfig.accentText}`} />
                <h3 className="text-lg font-black">Biblioteca de Exercícios e Substituições (Treinos A, B e C)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.values(workouts).flatMap(w =>
                  w.exercises.map(ex => (
                    <div key={ex.id} className={`p-4 rounded-2xl border space-y-1.5 ${themeConfig.bgCardAlt}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${themeConfig.accentBadge}`}>
                          {w.name}
                        </span>
                        <span className={`text-xs ${themeConfig.textMuted}`}>{ex.muscle}</span>
                      </div>
                      <h4 className="font-bold text-sm">{ex.name}</h4>
                      <p className={`text-xs ${themeConfig.textMuted}`}>{ex.instructions}</p>
                      <div className="text-[11px] pt-1">
                        <strong>Substituições:</strong> {ex.substitutions.join(' • ')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Observações Importantes de Segurança (Conforme Documento) */}
            <div className={`p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 space-y-2`}>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                Observações Importantes e Reavaliação (4–6 semanas)
              </div>
              <p className={`text-xs leading-relaxed ${themeConfig.textMuted}`}>
                Este é um ponto de partida geral para adultos sem limitações relatadas. Ajuste máquinas e amplitudes à sua mobilidade e à estrutura da academia. Interrompa o exercício se sentir dor aguda, tontura, falta de ar desproporcional ou mal-estar. Reavalie o plano após 4–6 semanas com base em recuperação, desempenho, tempo real de sessão e evolução das medidas.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          MODAL RÁPIDO DE PERFIL & ANTROPOMETRIA (ACESSO DE QUALQUER TELA)
         ========================================== */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`max-w-2xl w-full p-6 sm:p-7 rounded-3xl border space-y-5 my-8 ${themeConfig.bgCard}`}>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Ruler className={`w-6 h-6 ${themeConfig.accentText}`} />
                <div>
                  <h3 className="text-lg sm:text-xl font-black">Perfil & Dados Antropométricos</h3>
                  <p className={`text-xs ${themeConfig.textMuted}`}>
                    Configure seus dados biométricos iniciais, atuais e metas
                  </p>
                </div>
              </div>
              <button onClick={() => setProfileModalOpen(false)} className="p-1.5 rounded-lg hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => handleSaveProfileAndAnthropometry(e, true)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold block mb-1">Nome do Atleta</label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Idade / Sexo</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      value={profileForm.age}
                      onChange={e => setProfileForm({ ...profileForm, age: e.target.value })}
                      className={`w-16 px-2.5 py-2 rounded-xl border text-sm font-bold text-center ${themeConfig.bgCardAlt}`}
                    />
                    <select
                      value={profileForm.sex}
                      onChange={e => setProfileForm({ ...profileForm, sex: e.target.value })}
                      className={`flex-1 px-2 py-2 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                    >
                      <option value="" disabled>Sexo</option>
                      <option value="M">Masc</option>
                      <option value="F">Fem</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Altura (cm)</label>
                  <input
                    type="number"
                    value={profileForm.heightCm}
                    onChange={e => setProfileForm({ ...profileForm, heightCm: e.target.value, height: +(Number(e.target.value) / 100).toFixed(2) })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Peso Inicial (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.initialWeight}
                    onChange={e => setProfileForm({ ...profileForm, initialWeight: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1 text-lime-400">Peso Atual (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.currentWeight}
                    onChange={e => setProfileForm({ ...profileForm, currentWeight: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-black border-lime-400/50 ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Meta Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.goalWeight}
                    onChange={e => setProfileForm({ ...profileForm, goalWeight: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1 text-lime-400">Abdômen (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.currentWaist}
                    onChange={e => setProfileForm({ ...profileForm, currentWaist: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-black ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Pescoço (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.neck}
                    onChange={e => setProfileForm({ ...profileForm, neck: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Peitoral (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.chest}
                    onChange={e => setProfileForm({ ...profileForm, chest: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Braço Contr. (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profileForm.armContractedRight}
                    onChange={e => setProfileForm({ ...profileForm, armContractedRight: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
                  />
                </div>
              </div>

              {/* Preview dos Cálculos */}
              <div className={`p-3.5 rounded-2xl border grid grid-cols-3 gap-2 text-center ${themeConfig.bgCardAlt}`}>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block">IMC Calculado</span>
                  <span className="text-sm font-black">{anthropometrics.bmi ?? '—'}{anthropometrics.bmi !== null ? ' kg/m²' : ''}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block">BF Estimado</span>
                  <span className={`text-sm font-black ${themeConfig.accentText}`}>{anthropometrics.bodyFat === null ? '—' : `${anthropometrics.bodyFat}%`}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 block">Massa Magra</span>
                  <span className="text-sm font-black text-emerald-400">{anthropometrics.leanMassKg === null ? '—' : `${anthropometrics.leanMassKg} kg`}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(false);
                    setActiveTab('profile');
                  }}
                  className="text-xs font-bold underline opacity-80 hover:opacity-100"
                >
                  Abrir ficha antropométrica completa →
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileModalOpen(false)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 ${themeConfig.accentBg}`}
                  >
                    <Save className="w-4 h-4" />
                    Salvar Perfil
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL DE CONFIRMAÇÃO PARA RESETAR DADOS
         ========================================== */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-3xl border space-y-5 ${themeConfig.bgCard}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400 font-black text-base">
                <Trash2 className="w-5 h-5" />
                Gerenciar / Resetar Dados
              </div>
              <button onClick={() => setResetModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-xs leading-relaxed ${themeConfig.textMuted}`}>
              Escolha como deseja redefinir os registros do aplicativo. Essa ação limpará os dados salvos no navegador:
            </p>

            <div className="space-y-3">
              <button
                onClick={handleResetToBlankProfile}
                className="w-full p-4 rounded-2xl border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-left transition-all space-y-1"
              >
                <div className="flex items-center justify-between font-black text-sm text-red-300">
                  <span>1. Zerar Tudo e Criar Novo Perfil do Zero</span>
                  <UserPlus className="w-4 h-4" />
                </div>
                <p className="text-xs text-zinc-400">
                  Limpa histórico de sessões, zera hábitos e abre o formulário para cadastrar seus próprios dados antropométricos iniciais.
                </p>
              </button>

              <button
                onClick={handleResetToDefaultSheet}
                className={`w-full p-4 rounded-2xl border text-left transition-all space-y-1 ${themeConfig.bgCardAlt} hover:border-lime-400`}
              >
                <div className="flex items-center justify-between font-black text-sm">
                  <span>2. Restaurar ficha de treinos</span>
                  <RotateCcw className={`w-4 h-4 ${themeConfig.accentText}`} />
                </div>
                <p className={`text-xs ${themeConfig.textMuted}`}>
                  Restaura os exercícios sem cargas, histórico ou medidas pessoais.
                </p>
              </button>
            </div>

            <button
              onClick={() => setResetModalOpen(false)}
              className={`w-full py-2.5 rounded-xl border text-xs font-bold ${themeConfig.bgCardAlt}`}
            >
              Cancelar e Manter Meus Dados
            </button>
          </div>
        </div>
      )}

      {/* EDITOR DA FICHA DE TREINO */}
      {workoutEditorOpen && workoutDraft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className={`w-full max-w-5xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 rounded-3xl border space-y-6 ${themeConfig.bgCard}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`text-xs font-bold uppercase ${themeConfig.accentText}`}>Personalizar plano</span>
                <h2 className="text-2xl font-black mt-1">Editar sessão {selectedWorkoutKey}</h2>
                <p className={`text-xs mt-1 ${themeConfig.textMuted}`}>
                  As alterações afetam próximos treinos. Registros já concluídos permanecem iguais.
                </p>
              </div>
              <button
                onClick={() => setWorkoutEditorOpen(false)}
                className="p-2 rounded-lg hover:bg-zinc-800"
                aria-label="Fechar editor sem salvar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs font-bold space-y-1.5">
                Nome da sessão
                <input
                  value={workoutDraft.name}
                  onChange={e => setWorkoutDraft(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm ${themeConfig.bgCardAlt}`}
                />
              </label>
              <label className="text-xs font-bold space-y-1.5">
                Ênfase
                <input
                  value={workoutDraft.emphasis}
                  onChange={e => setWorkoutDraft(prev => ({ ...prev, emphasis: e.target.value }))}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm ${themeConfig.bgCardAlt}`}
                />
              </label>
            </div>

            <section className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black">Exercícios da sessão</h3>
                <span className={`text-xs ${themeConfig.textMuted}`}>{workoutDraft.exercises.length} exercícios</span>
              </div>
              {workoutDraft.exercises.map((exercise, index) => (
                <div key={exercise.id} className={`p-4 rounded-2xl border space-y-3 ${themeConfig.bgCardAlt}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-xs font-bold uppercase ${themeConfig.accentText}`}>Exercício {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => setWorkoutDraft(prev => ({
                        ...prev,
                        exercises: prev.exercises.filter(item => item.id !== exercise.id)
                      }))}
                      disabled={workoutDraft.exercises.length <= 1}
                      className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                      aria-label={`Remover ${exercise.name}`}
                      title="Remover exercício"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="text-xs font-bold space-y-1.5">
                      Exercício
                      <input
                        value={exercise.name}
                        onChange={e => updateWorkoutDraftExercise(exercise.id, 'name', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                      />
                    </label>
                    <label className="text-xs font-bold space-y-1.5">
                      Grupo muscular
                      <input
                        value={exercise.muscle}
                        onChange={e => updateWorkoutDraftExercise(exercise.id, 'muscle', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <label className="text-xs font-bold space-y-1.5">
                      Séries
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={exercise.targetSets}
                        onChange={e => updateWorkoutDraftExercise(exercise.id, 'targetSets', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                      />
                    </label>
                    <label className="text-xs font-bold space-y-1.5">
                      Repetições / duração
                      <input
                        value={exercise.targetReps}
                        onChange={e => updateWorkoutDraftExercise(exercise.id, 'targetReps', e.target.value)}
                        placeholder="Ex.: 8-12"
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                      />
                    </label>
                    <label className="text-xs font-bold space-y-1.5">
                      Descanso (segundos)
                      <input
                        type="number"
                        min="0"
                        max="600"
                        value={exercise.restSeconds}
                        onChange={e => updateWorkoutDraftExercise(exercise.id, 'restSeconds', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                      />
                    </label>
                  </div>
                  <label className="block text-xs font-bold space-y-1.5">
                    Instruções
                    <textarea
                      value={exercise.instructions}
                      onChange={e => updateWorkoutDraftExercise(exercise.id, 'instructions', e.target.value)}
                      rows={2}
                      className={`w-full px-3 py-2 rounded-lg border text-sm resize-y ${themeConfig.bgMain}`}
                    />
                  </label>
                </div>
              ))}
            </section>

            <form onSubmit={handleAddExercise} className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${themeConfig.bgCardAlt}`}>
              <div>
                <h3 className="text-lg font-black">Adicionar exercício</h3>
                <p className={`text-xs mt-1 ${themeConfig.textMuted}`}>O exercício começa sem cargas registradas.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-xs font-bold space-y-1.5">
                  Nome do exercício
                  <input
                    required
                    value={newExerciseDraft.name}
                    onChange={e => setNewExerciseDraft(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex.: Remada unilateral"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                  />
                </label>
                <label className="text-xs font-bold space-y-1.5">
                  Grupo muscular
                  <input
                    required
                    value={newExerciseDraft.muscle}
                    onChange={e => setNewExerciseDraft(prev => ({ ...prev, muscle: e.target.value }))}
                    placeholder="Ex.: Costas"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="text-xs font-bold space-y-1.5">
                  Séries
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={newExerciseDraft.targetSets}
                    onChange={e => setNewExerciseDraft(prev => ({ ...prev, targetSets: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                  />
                </label>
                <label className="text-xs font-bold space-y-1.5">
                  Repetições / duração
                  <input
                    required
                    value={newExerciseDraft.targetReps}
                    onChange={e => setNewExerciseDraft(prev => ({ ...prev, targetReps: e.target.value }))}
                    placeholder="Ex.: 8-12"
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                  />
                </label>
                <label className="text-xs font-bold space-y-1.5">
                  Descanso (segundos)
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={newExerciseDraft.restSeconds}
                    onChange={e => setNewExerciseDraft(prev => ({ ...prev, restSeconds: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${themeConfig.bgMain}`}
                  />
                </label>
              </div>
              <label className="block text-xs font-bold space-y-1.5">
                Instruções (opcional)
                <textarea
                  value={newExerciseDraft.instructions}
                  onChange={e => setNewExerciseDraft(prev => ({ ...prev, instructions: e.target.value }))}
                  rows={2}
                  className={`w-full px-3 py-2 rounded-lg border text-sm resize-y ${themeConfig.bgMain}`}
                />
              </label>
              <button type="submit" className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${themeConfig.accentBg}`}>
                <Plus className="w-4 h-4" /> Adicionar à sessão
              </button>
            </form>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setWorkoutEditorOpen(false)}
                className={`px-5 py-3 rounded-xl border text-sm font-bold ${themeConfig.bgCardAlt}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveWorkoutDraft}
                className={`px-5 py-3 rounded-xl text-sm font-black ${themeConfig.accentBg}`}
              >
                Salvar ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE INSTRUÇÕES DE EXECUÇÃO */}
      {instructionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${themeConfig.accentBadge}`}>
                Instruções de Execução
              </span>
              <button onClick={() => setInstructionModal(null)} className="p-1 rounded-lg hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-black">{instructionModal.name}</h3>
            <p className={`text-sm leading-relaxed ${themeConfig.textMuted}`}>
              {instructionModal.instructions}
            </p>
            <div className={`p-3.5 rounded-2xl border text-xs space-y-1 ${themeConfig.bgCardAlt}`}>
              <div><strong>Grupo Muscular:</strong> {instructionModal.muscle}</div>
              <div><strong>Meta:</strong> {instructionModal.targetSets} séries de {instructionModal.targetReps}</div>
              <div><strong>Descanso:</strong> {instructionModal.restLabel}</div>
            </div>
            <button
              onClick={() => setInstructionModal(null)}
              className={`w-full py-3 rounded-xl font-black text-xs ${themeConfig.accentBg}`}
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE SUBSTITUIÇÃO DE EXERCÍCIO */}
      {substituteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${themeConfig.accentBadge}`}>
                Substituir Exercício
              </span>
              <button onClick={() => setSubstituteModal(null)} className="p-1 rounded-lg hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-black">
              Adaptar {substituteModal.exercise.originalName}
            </h3>
            <p className={`text-xs ${themeConfig.textMuted}`}>
              Aparelho ocupado na academia? Selecione uma opção biomecanicamente equivalente:
            </p>
            <div className="space-y-2">
              {substituteModal.exercise.substitutions.map(sub => (
                <button
                  key={sub}
                  onClick={() =>
                    handleSubstituteExercise(
                      substituteModal.workoutKey,
                      substituteModal.exercise.id,
                      sub
                    )
                  }
                  className={`w-full p-3.5 rounded-2xl border text-left font-bold text-sm flex items-center justify-between ${
                    substituteModal.exercise.name === sub
                      ? `${themeConfig.accentBorder} ${themeConfig.bgCardAlt}`
                      : themeConfig.bgCardAlt
                  }`}
                >
                  <span>{sub}</span>
                  {substituteModal.exercise.name === sub && (
                    <Check className={`w-4 h-4 ${themeConfig.accentText}`} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE RELATÓRIO DE EVOLUÇÃO */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-lg w-full p-6 rounded-3xl border space-y-4 ${themeConfig.bgCard}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black">Relatório Consolidado — {appName}</h3>
              <button onClick={() => setReportModalOpen(false)} className="p-1 rounded-lg hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={`p-4 rounded-2xl border space-y-2 text-xs ${themeConfig.bgCardAlt}`}>
              <div><strong>Atleta:</strong> {userProfile.name} ({userProfile.age} anos, {userProfile.height} m)</div>
              <div><strong>Peso Corporal:</strong> {userProfile.initialWeight} kg → {userProfile.currentWeight} kg ({weightDiff} kg)</div>
              <div><strong>Circunferência Abdominal:</strong> {userProfile.initialWaist} cm → {userProfile.currentWaist} cm ({waistDiff} cm)</div>
              <div><strong>Composição Estimada:</strong> BF {anthropometrics.bodyFat === null ? '—' : `${anthropometrics.bodyFat}%`} • Massa Magra {anthropometrics.leanMassKg === null ? '—' : `${anthropometrics.leanMassKg} kg`}</div>
              <div><strong>Sessões Registradas:</strong> {sessionLogs.length} treinos concluídos</div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  window.print();
                  setReportModalOpen(false);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black ${themeConfig.accentBg}`}
              >
                Imprimir / Salvar PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          BARRA DE NAVEGAÇÃO INFERIOR (MOBILE-FIRST)
         ========================================== */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40">
        <div className={`grid grid-cols-5 p-1.5 rounded-2xl border shadow-2xl backdrop-blur-xl ${themeConfig.navBg}`}>
          {[
            { id: 'dashboard', label: 'Início', icon: Activity },
            { id: 'workouts', label: 'Treinos', icon: Dumbbell },
            { id: 'evolution', label: 'Evolução', icon: TrendingUp },
            { id: 'habits', label: 'Hábitos', icon: Heart },
            { id: 'profile', label: 'Perfil', icon: User }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? `${themeConfig.accentBg} font-black shadow-md`
                    : `${themeConfig.textMuted} hover:opacity-100`
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-bold leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}