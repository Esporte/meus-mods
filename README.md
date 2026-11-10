# meus-mods

Mods para o Claude Code (terminal e app desktop).

| Mod | O que faz |
| --- | --- |
| **mods-panel** | Painel `/mods` para ver, ligar, desligar, instalar e agrupar plugins em perfis. Plugin ligado aparece em **● ON verde**, desligado em **● OFF vermelho**. Baseado no [mods-manager](https://github.com/ptpmediabr/mods-manager) de Chiara Costa (MIT). |
| **mods-path-fix** | No Windows, faz os mods acharem o `claude.exe`: troca o comando `claude` pelo caminho completo. Sem ele, o painel `/mods` mostra "não consegui rodar `claude plugin list`". |

## Instalar

No terminal do Claude Code:

```
/plugin marketplace add Esporte/meus-mods
/plugin install mods-panel@meus-mods
/plugin install mods-path-fix@meus-mods
```

Ou no shell:

```bash
claude plugin marketplace add Esporte/meus-mods
claude plugin install mods-panel@meus-mods
claude plugin install mods-path-fix@meus-mods
```

No app desktop: **+ → Plugins → Add marketplace**, informe `Esporte/meus-mods` e instale os dois.

Depois abra uma sessão nova e rode `/mods`.

> Se você também tem o `mods-manager` original instalado, desligue-o para não ter dois painéis `/mods`.

## Licença

MIT. O `mods-panel` mantém a licença e o crédito originais de Chiara Costa.
