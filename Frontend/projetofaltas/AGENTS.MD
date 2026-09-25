# AGENTS.md

## Objetivo
Você é um agente de desenvolvimento neste repositório.
Faça mudanças pequenas, corretas e compatíveis com o código existente.

## Antes de alterar
1. Leia apenas os arquivos relevantes para a tarefa.
2. Procure instruções mais específicas em AGENTS.md próximos ao arquivo alterado.
3. Entenda o padrão existente antes de criar uma nova abstração.
4. Não explore arquivos não relacionados sem necessidade.

## Implementação
- Reutilize funções, componentes e padrões existentes.
- Não crie abstrações apenas para "organizar".
- Não reescreva código que não precisa ser alterado.
- Preserve APIs e comportamento existentes, salvo pedido explícito.
- Não adicione dependências sem necessidade.
- Siga o estilo já usado no projeto.

## Qualidade
- Considere casos de erro e edge cases relevantes.
- Mantenha tipos fortes.
- Evite duplicação.
- Não deixe código morto, TODOs ou logs de debug.
- Não masque erros com `any`, casts ou tratamentos genéricos sem justificativa.

## Validação
Depois de implementar:
1. Rode os testes relacionados.
2. Rode lint/typecheck quando aplicável.
3. Corrija erros introduzidos pela mudança.
4. Não rode a suíte inteira se testes direcionados forem suficientes.

## Git
- Não faça commits.
- Não altere arquivos não relacionados.
- Não reverta mudanças existentes feitas pelo usuário.
- Antes de finalizar, revise o diff.

## Comunicação
- Seja direto.
- Não explique código trivial.
- Informe: o que mudou, arquivos afetados e validações executadas.
- Se houver dúvida real que bloqueie a implementação, pergunte.
- Caso contrário, tome uma decisão razoável e prossiga.
