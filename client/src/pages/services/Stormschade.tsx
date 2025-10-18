import ServicePage from "../ServicePage";

export default function Stormschade() {
  return (
    <ServicePage
      title="Stormschade"
      description="Acute hulp bij stormschade aan uw dak. Storm kan aanzienlijke schade veroorzaken aan uw dak. Wij zijn 24/7 bereikbaar voor noodreparaties en zorgen dat uw woning snel weer waterdicht is. Daarna kunnen we de definitieve reparatie of renovatie uitvoeren."
      benefits={[
        "24/7 bereikbaar voor noodgevallen",
        "Snelle responstijd bij acute schade",
        "Noodreparaties om verdere schade te voorkomen",
        "Hulp bij verzekeringsclaims en rapportage",
        "Complete herstel van stormschade",
        "Preventieve maatregelen tegen toekomstige schade",
      ]}
    />
  );
}
