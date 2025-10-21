import React, { useState } from "react";

// shadcn/ui & lucide-react imports (assumes your project has shadcn structure)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

// Simple Image component with fallback
const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [errored, setErrored] = useState(false);
  return (
    <img
      src={errored ? "/fallback-banner.jpg" : src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
};

export default function App() {
  const [form, setForm] = useState({ name: "", callSign: "", mobile: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [loading, setLoading] = useState(false);

  const venueEmbed = `https://www.google.com/maps?q=Sargalaya+Heritage+Center,+Irinave,+Vadakara&output=embed`;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.callSign.trim()) e.callSign = "Call sign is required";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a 10-digit mobile number";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;
    setStep("payment");
  }

  function simulatePayment() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030213] to-[#07103a] text-slate-50">
      <header className="container mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2v20M4 12h16" stroke="#030213" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">HAM MEET — VADAKARA 2026</h1>
            <p className="text-sm text-slate-300">Sargalaya Heritage Center • Irinave, Vadakara, Kerala</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-4 items-center">
          <a href="#about" className="hover:underline">About</a>
          <a href="#venue" className="hover:underline">Venue</a>
          <a href="#register" className="hover:underline">Register</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-8">
          <div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 opacity-40 -z-0 backdrop-blur-sm" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1673260839682-87746c4d28d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="HAM MEET Banner"
                className="w-full h-72 object-cover block rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">HAM MEET</h2>
                  <p className="text-lg md:text-xl text-slate-200">Vadakara — 2026</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-slate-300">
                An annual gathering of amateur radio enthusiasts, operators, and innovators. Expect hands-on demos, technical
                workshops, equipment exhibitions and opportunities to connect with the amateur radio community from across India.
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge>Workshops</Badge>
                <Badge>Exhibitions</Badge>
                <Badge>Networking</Badge>
                <Badge>DX Tests</Badge>
              </div>

              <div className="mt-4 flex gap-3">
                <a href="#register">
                  <Button>Register ₹1000</Button>
                </a>
                <a href="#venue">
                  <Button variant="ghost">View Venue</Button>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <aside>
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1" />
                    <div>
                      <strong>Venue:</strong> Sargalaya Heritage Center, Irinave, Vadakara, Kerala 673104
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1" />
                    <div>
                      <strong>Year:</strong> 2026
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1" />
                    <div>
                      <strong>Registration Fee:</strong> ₹1000
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>Workshops &raquo; RF design, Antennas, Digital Modes</li>
                  <li>Equipment Exhibitions &raquo; Vendors &amp; Clubs</li>
                  <li>Networking &raquo; Local nets, DX sessions</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* About Section */}
        <section id="about" className="py-8">
          <h3 className="text-2xl font-bold">About HAM MEET Vadakara</h3>
          <p className="text-slate-300 mt-3 max-w-3xl">
            HAM MEET Vadakara 2026 brings together amateur radio operators, hobbyists and industry experts for a weekend of
            hands-on learning, live demonstrations, and community building. Sessions include introductory workshops for new
            operators and deep-dive technical talks for experienced amateurs.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Hands-on Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                Learn practical skills: antenna building, SDR usage, digital modes and noise reduction techniques.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipment Exhibition</CardTitle>
              </CardHeader>
              <CardContent>
                Explore the latest radios, accessories and homebrew projects from vendors and local clubs.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Networking & DX</CardTitle>
              </CardHeader>
              <CardContent>
                Meet fellow operators, exchange call signs, and participate in DX and contest-style sessions.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Venue */}
        <section id="venue" className="py-8">
          <h3 className="text-2xl font-bold">Venue — Sargalaya Heritage Center</h3>
          <p className="text-slate-300 mt-2">Irinave, Vadakara, Kerala 673104</p>

          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                title="Sargalaya Heritage Center Map"
                src={venueEmbed}
                width="100%"
                height="360"
                loading="lazy"
                className="border-0"
              />
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Venue Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    Sargalaya is a cultural and heritage space with easy parking and nearby amenities. Recommended hotels and
                    local transport options will be updated as they are confirmed.
                  </p>

                  <div className="mt-4">
                    <h4 className="font-semibold">Getting There</h4>
                    <ol className="list-decimal list-inside text-slate-300 mt-2">
                      <li>Nearest major town: Vadakara</li>
                      <li>Public transport: Local buses & taxis</li>
                      <li>Parking available on-site</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration */}
        <section id="register" className="py-8">
          <h3 className="text-2xl font-bold">Registration</h3>
          <p className="text-slate-300 mt-2">Complete the form below to register for HAM MEET Vadakara 2026. Registration fee: ₹1000.</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/40 p-6 rounded-lg">
                <div>
                  <Label>Full Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <p className="text-rose-400 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <Label>Call Sign</Label>
                  <Input value={form.callSign} onChange={(e) => setForm({ ...form, callSign: e.target.value })} />
                  {errors.callSign && <p className="text-rose-400 text-sm">{errors.callSign}</p>}
                </div>

                <div>
                  <Label>Mobile Number</Label>
                  <Input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                  {errors.mobile && <p className="text-rose-400 text-sm">{errors.mobile}</p>}
                </div>

                <div>
                  <Label>Complete Address</Label>
                  <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} />
                  {errors.address && <p className="text-rose-400 text-sm">{errors.address}</p>}
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="agree" className="rounded" defaultChecked />
                  <label htmlFor="agree" className="text-sm text-slate-300">I agree to the event terms & conditions</label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit">Proceed to Payment</Button>
                  <Button variant="outline" onClick={() => setForm({ name: "", callSign: "", mobile: "", address: "" })}>
                    Reset
                  </Button>
                </div>
              </form>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment (Demo)</CardTitle>
                </CardHeader>
                <CardContent>
                  {step === "form" && <p className="text-slate-300">Complete the form to unlock payment.</p>}

                  {step === "payment" && (
                    <div className="space-y-4">
                      <p className="text-slate-300">Registration Fee: <strong>₹1000</strong></p>
                      <div className="flex gap-2">
                        <Button onClick={simulatePayment} disabled={loading}>{loading ? "Processing..." : "Pay with Demo Gateway"}</Button>
                        <Button variant="ghost" onClick={() => setStep("form")}>Back</Button>
                      </div>
                    </div>
                  )}

                  {step === "success" && (
                    <div className="space-y-3">
                      <p className="text-green-300 font-semibold">Payment Successful — Registration Confirmed!</p>
                      <p className="text-slate-300 text-sm">A confirmation email will be sent to you (demo).</p>
                      <div className="mt-2">
                        <Button onClick={() => { setStep("form"); setForm({ name: "", callSign: "", mobile: "", address: "" }); }}>
                          Register Another
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm">This is a demo payment flow. Integrate Razorpay / Stripe / PayPal for production payments and add backend
                    APIs for storing registrations securely.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="py-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-lg">Contact</h4>
              <p className="text-slate-300 mt-2">Email: info@hamvadakara.org</p>
              <p className="text-slate-300">Phone: +91 7356119854</p>
            </div>

            <div>
              <h4 className="font-bold text-lg">Organizers</h4>
              <p className="text-slate-300 mt-2">Local Ham Clubs • Volunteers • Sponsors</p>
            </div>

            <div>
              <h4 className="font-bold text-lg">Follow</h4>
              <div className="mt-2 flex gap-2">
                <a className="text-sm text-slate-300 hover:underline">Twitter</a>
                <a className="text-sm text-slate-300 hover:underline">Facebook</a>
                <a className="text-sm text-slate-300 hover:underline">Instagram</a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-slate-500">Made with ❤️ for the Amateur Radio Community — HAM MEET Vadakara 2026</div>
        </footer>
      </main>
    </div>
  );
}
