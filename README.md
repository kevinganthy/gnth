# GNTH - Agence web

Bienvenue sur le repo de code du site de l'agence web GNTH !

**Stack technique :**

- Sveltekit
- SASS
- Github Actions
- Vitest
- Playwright

**CI workflow :**

- La branche `preview` permet de voir le site sur https://gnth-preview.surge.sh.
- Un `PR` sur la branche ̀`main` déclenche les tests (unitaires et d'intégration), une preview sur [surge](https://gnth-preview.surge.sh) et un test Page Speed Insights.
- Une modification sur la branche `main` déclenche les tests et un déploiement en [production](https://gnth.fr).
