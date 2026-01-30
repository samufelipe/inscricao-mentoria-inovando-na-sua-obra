export default function MentoriaFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gradient-to-r from-primary to-[hsl(43,96%,45%)] text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="font-bold text-lg mb-1">Inovando na Sua Obra</p>
          <p className="text-sm opacity-80">
            © {currentYear} | Todos os Direitos Reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
