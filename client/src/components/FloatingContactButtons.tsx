import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContactButtons() {
  const phoneNumber = "+31612466941";
  const whatsappNumber = "31612466941";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <button
        onClick={handleWhatsApp}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <button
        onClick={handleCall}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Bel ons"
      >
        <Phone className="h-6 w-6" />
      </button>
    </div>
  );
}
