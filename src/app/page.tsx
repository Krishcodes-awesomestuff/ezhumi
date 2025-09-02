import Navbar from '@/components/Navbar';
import SideNav from '@/components/SideNav';
import Hero from '@/components/Hero';
import Section from '@/components/Section';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <SideNav />
      
      <Hero />
      
      <Section id="about" title="About Ezhumi">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Ezhumi is more than just a hackathon—it&apos;s a movement dedicated to transforming agriculture through innovation and technology.
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Join passionate developers, designers, and agriculture enthusiasts as we hack, seek solutions, and cultivate the future of farming.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-lg border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Event Details</h3>
            <div className="space-y-3 text-white/80">
              <div><strong>Date:</strong> Coming Soon</div>
              <div><strong>Duration:</strong> 48 Hours</div>
              <div><strong>Format:</strong> Hybrid (Online & Offline)</div>
              <div><strong>Prize Pool:</strong> $50,000</div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="theme" title="Themes & Challenges">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-4">Sustainable Farming</h3>
            <p className="text-white/80">
              Develop solutions for eco-friendly agriculture practices and sustainable crop management.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-4">Smart Agriculture</h3>
            <p className="text-white/80">
              Create IoT and AI-powered tools for precision farming and automated crop monitoring.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-4">Supply Chain</h3>
            <p className="text-white/80">
              Build platforms to optimize farm-to-market logistics and reduce food waste.
            </p>
          </div>
        </div>
      </Section>

      <Section id="timeline" title="Event Timeline">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Registration Opens</h3>
                <p className="text-white/80">Sign up and form your teams</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-white/50 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Hackathon Begins</h3>
                <p className="text-white/80">48 hours of intensive development</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-white/30 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Submission & Judging</h3>
                <p className="text-white/80">Present your solutions to expert judges</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-white/20 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Awards Ceremony</h3>
                <p className="text-white/80">Celebrate the winners and innovations</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faqs" title="Frequently Asked Questions">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-3">Who can participate?</h3>
            <p className="text-white/80">
              Students, professionals, and anyone passionate about agriculture and technology are welcome to join.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-3">Do I need a team?</h3>
            <p className="text-white/80">
              Teams of 2-4 members are recommended, but solo participants are also welcome.
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-bold mb-3">What should I bring?</h3>
            <p className="text-white/80">
              Just your laptop, creativity, and passion for agriculture innovation. We&apos;ll provide food, drinks, and mentorship.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
