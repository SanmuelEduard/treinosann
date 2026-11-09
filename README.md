# Full Body 3X | Diário de Treino

Aplicação para organizar treinos, registrar séries e acompanhar evolução. Os dados são salvos automaticamente no armazenamento local do navegador e permanecem neste dispositivo. Use as opções de backup do app para exportar ou importar seus registros.

## Desenvolvimento

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Publicação no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica automaticamente a cada atualização da branch `main`. Em **Settings > Pages**, selecione **GitHub Actions** como origem. Depois, acompanhe o workflow na aba **Actions**. O endereço do projeto será `https://sanmueleduard.github.io/treinosann/`.