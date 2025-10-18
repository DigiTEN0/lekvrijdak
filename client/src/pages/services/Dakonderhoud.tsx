import ServicePage from "../ServicePage";

export default function Dakonderhoud() {
  return (
    <ServicePage
      title="Dakonderhoud"
      description="Regelmatig dakonderhoud verlengt de levensduur van uw dak aanzienlijk. Wij bieden periodieke inspecties, reiniging, en klein onderhoud om grotere problemen en kostbare reparaties te voorkomen. Preventief onderhoud bespaart u op de lange termijn veel geld."
      benefits={[
        "Jaarlijkse of periodieke dakinspecties",
        "Reiniging van dak en dakgoten",
        "Vervanging van losse of beschadigde pannen",
        "Controle en herstel van lood- en zinkwerk",
        "Preventieve behandeling tegen mos en algen",
        "Onderhoudscontracten op maat",
      ]}
    />
  );
}
