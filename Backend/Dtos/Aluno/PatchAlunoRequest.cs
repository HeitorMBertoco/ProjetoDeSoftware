namespace Backend.Dtos.Aluno
{
    public record PatchAlunoRequest
    {
        public String? Nome { get; set; }
        public int? Idade { get; set; }
        public String? Cpf { get; set; }
        public String? Rm { get; set; }
        public String? Turma { get; set; }
        public int? QuantidadeFaltas { get; set; }
    }
}
