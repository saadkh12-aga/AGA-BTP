import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, MessageSquare } from 'lucide-react';

export const VisitRequestModal: React.FC = () => {
  const { visitModalOpportunity, setVisitModalOpportunity, addVisitRequest } = useApp();
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [desiredTime, setDesiredTime] = useState('11:00');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!visitModalOpportunity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone || !email || !desiredDate) {
      alert('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    addVisitRequest({
      opportunityId: visitModalOpportunity.id,
      opportunityTitle: visitModalOpportunity.title,
      clientName,
      phone,
      email,
      desiredDate,
      desiredTime,
      message,
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setVisitModalOpportunity(null);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#121419] border border-[#2d3039] rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl gold-glow">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-[#c5a059]/20 text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-luxury text-white">Demande de Visite Enregistrée</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Votre demande de visite privée pour le bien <strong>{visitModalOpportunity.title}</strong> a été transmise à notre associé référent pour la date du <strong>{desiredDate}</strong> à <strong>{desiredTime}</strong>.
            </p>
            <p className="text-xs text-neutral-400">
              Notre secrétariat vous contactera par téléphone et courriel sous 2 heures ouvrées pour coordonner les accès et l'accueil sur place.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs text-[#c5a059] uppercase tracking-wider font-semibold mb-1">
              Protocole de Visite Privée
            </div>
            <h3 className="text-xl font-serif-luxury text-white font-semibold mb-1">
              Planifier une Visite
            </h3>
            <p className="text-xs text-neutral-400 mb-6 line-clamp-1">
              {visitModalOpportunity.title} · {visitModalOpportunity.city}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Nom et Prénom *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: M. Karim El Fassi"
                    className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Téléphone (avec indicatif) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+212 6... ou +33 6..."
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Adresse Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@domaine.com"
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Date Souhaitée *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      required
                      value={desiredDate}
                      onChange={(e) => setDesiredDate(e.target.value)}
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Heure Préférée *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <select
                      value={desiredTime}
                      onChange={(e) => setDesiredTime(e.target.value)}
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none cursor-pointer"
                    >
                      <option value="10:00">10:00 (Matinée)</option>
                      <option value="11:30">11:30 (Matinée)</option>
                      <option value="15:00">15:00 (Après-midi)</option>
                      <option value="17:00">17:00 (Fin d'après-midi / Coucher de soleil)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Précisions / Besoins particuliers
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Présence de notre architecte conseil, besoin d'un transfert aéroport, consultation des titres en agence..."
                  className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl p-3 text-sm text-white placeholder:text-neutral-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
                >
                  Confirmer ma Demande de Visite
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
