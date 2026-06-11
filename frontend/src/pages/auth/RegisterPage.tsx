import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { 
  Building2, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  Pill, 
  Utensils, 
  ShoppingCart, 
  Store, 
  Truck, 
  CheckCircle,
  Loader2,
  AlertCircle
} from 'lucide-react'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  // Onboarding wizard steps: 1 -> 2 -> 3 -> 4 (Verification) -> 5 (Completion)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)

  // Step 1 fields
  const [businessName, setBusinessName] = useState('')
  const [businessReg, setBusinessReg] = useState('')

  // Step 2 fields
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [password, setPassword] = useState('')

  // Step 3 fields
  const [businessType, setBusinessType] = useState<string>('')

  // Step 4 verification state
  const [verifyStatus, setVerifyStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [verifyProgress, setVerifyProgress] = useState(0)

  const [error, setError] = useState<string | null>(null)

  // KYB Verification simulation
  useEffect(() => {
    if (step === 4) {
      setError(null)
      setVerifyProgress(0)
      setVerifyStatus('verifying')

      const interval = setInterval(() => {
        setVerifyProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            // Register user on backend once verified
            handleRegisterSubmit()
            return 100
          }
          return prev + 10
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [step])

  async function handleRegisterSubmit() {
    try {
      // Create account
      await register({
        name: contactName || businessName,
        email: contactEmail,
        password: password
      })
      setVerifyStatus('success')
      // Auto advance to completion screen after 800ms
      setTimeout(() => {
        setStep(5)
      }, 800)
    } catch (err) {
      setVerifyStatus('error')
      setError('Registration failed. This email may already be in use.')
    }
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep((prev) => (prev + 1) as any)
    }
  }

  const handlePrevStep = () => {
    if (step > 1 && step !== 4 && step !== 5) {
      setStep((prev) => (prev - 1) as any)
    }
  }

  return (
    <div className="space-y-6">
      {/* Wizard Header (Only steps 1-3) */}
      {step <= 3 && (
        <div>
          <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest mb-3">
            <span>Onboarding Status</span>
            <span>Step {step} of 3</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden flex gap-1">
            <div className={`h-full rounded-full flex-1 transition-all ${step >= 1 ? 'bg-q-blue' : 'bg-white/5'}`} />
            <div className={`h-full rounded-full flex-1 transition-all ${step >= 2 ? 'bg-q-blue' : 'bg-white/5'}`} />
            <div className={`h-full rounded-full flex-1 transition-all ${step >= 3 ? 'bg-q-blue' : 'bg-white/5'}`} />
          </div>
        </div>
      )}

      {error && (
        <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/25 text-red-400 p-4 rounded-2xl text-xs font-bold leading-normal">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Business Info */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Business Information</h2>
            <p className="text-xs text-white/50 mt-1 font-medium">Verify your commercial entity profile.</p>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Registered Business Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
                  placeholder="e.g. Apex Pharmacy Ltd"
                  required
                />
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Business License / Registration Number (KYB)</label>
              <div className="relative">
                <input
                  type="text"
                  value={businessReg}
                  onChange={(e) => setBusinessReg(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
                  placeholder="e.g. RC-9481923"
                  required
                />
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-q-blue hover:bg-q-blue-700 py-4 px-6 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 mt-4"
          >
            Continue <ArrowRight size={16} />
          </button>
        </form>
      )}

      {/* Step 2: Contact Info */}
      {step === 2 && (
        <form onSubmit={handleNextStep} className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Contact Credentials</h2>
            <p className="text-xs text-white/50 mt-1 font-medium">Create your administrative access account.</p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5">Authorized Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
                  placeholder="e.g. Idris Afuwape"
                  required
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5">Business Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
                  placeholder="name@apexpharmacy.com"
                  required
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
                  placeholder="+234..."
                  required
                />
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5">Account Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-q-blue focus:ring-1 focus:ring-q-blue transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center justify-center p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-q-blue hover:bg-q-blue-700 py-3.5 px-6 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Business Category */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Business Segment</h2>
            <p className="text-xs text-white/50 mt-1 font-medium">Select your primary retail or distributor segment.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { id: 'pharmacy', label: 'Pharmacy', desc: 'Meds & Healthcare', icon: Pill },
              { id: 'grocery', label: 'Grocery Store', desc: 'Fresh & Packaged Food', icon: ShoppingCart },
              { id: 'restaurant', label: 'Restaurant', desc: 'F&B Operations', icon: Utensils },
              { id: 'retail', label: 'General Retail', desc: 'Consumer Goods', icon: Store },
              { id: 'distributor', label: 'Distributor', desc: 'Local Logistics', icon: Truck }
            ].map((cat) => {
              const IconComp = cat.icon
              const isSelected = businessType === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setBusinessType(cat.id)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all ${
                    isSelected 
                      ? 'border-q-blue bg-q-blue/10 text-white shadow-lg' 
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <IconComp className={`h-6 w-6 ${isSelected ? 'text-q-blue' : 'text-white/40'} mb-3`} />
                  <p className="text-xs font-bold">{cat.label}</p>
                  <p className="text-[9px] text-white/40 font-medium mt-0.5 leading-none">{cat.desc}</p>
                </button>
              )
            })}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center justify-center p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/5"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (businessType) setStep(4)
              }}
              disabled={!businessType}
              className={`flex-1 rounded-2xl py-3.5 px-6 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                businessType ? 'bg-q-blue hover:bg-q-blue-700' : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
              }`}
            >
              Verify KYB & Finish <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: KYB Verification Simulator */}
      {step === 4 && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
          {verifyStatus === 'verifying' ? (
            <>
              <Loader2 className="h-12 w-12 text-q-blue animate-spin" />
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white">Verifying Merchant Credentials</h2>
                <p className="text-xs text-white/50 font-medium max-w-xs mx-auto">
                  Connecting to commercial registries and verifying licensure RC numbers...
                </p>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden max-w-xs">
                <div 
                  className="h-full bg-q-blue transition-all duration-300"
                  style={{ width: `${verifyProgress}%` }}
                />
              </div>
              <span className="text-xs text-white/40 font-bold">{verifyProgress}% Complete</span>
            </>
          ) : verifyStatus === 'error' ? (
            <>
              <AlertCircle className="h-12 w-12 text-red-500" />
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white">KYB Registry Connection Error</h2>
                <p className="text-xs text-red-400 font-medium">
                  {error || 'Unable to complete registry verification check.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white px-4 py-2 hover:bg-white/10"
              >
                Back to segment selection
              </button>
            </>
          ) : (
            <>
              <CheckCircle className="h-12 w-12 text-q-green animate-bounce" />
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white">KYB Credentials Approved</h2>
                <p className="text-xs text-q-green font-bold">
                  Apex Registry Check passed. Account created.
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 5: Success & Completion Screen */}
      {step === 5 && (
        <div className="flex flex-col items-center text-center py-6 space-y-6">
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-q-green" />
            <div className="absolute inset-0 bg-q-green/20 rounded-full blur-[10px] scale-150 -z-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Welcome to Quantigo</h2>
            <p className="text-sm text-white/50 font-medium max-w-xs mx-auto">
              Your onboarding process is complete. You can now access the commerce command center.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase">Business Segment</p>
              <p className="text-xs text-white font-extrabold mt-0.5">
                {businessType ? businessType.charAt(0).toUpperCase() + businessType.slice(1) : 'Merchant'}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-white/40 font-bold uppercase">Status</p>
              <p className="text-xs text-q-green font-extrabold mt-0.5">Active / Verified</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full relative group rounded-2xl py-4 px-6 text-sm font-semibold text-white overflow-hidden transition-all flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #22C55E 100%)' }}
          >
            <span className="relative z-10">Enter Command Center</span>
            <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </button>
        </div>
      )}

      {/* Sign in redirect (only steps 1-3) */}
      {step <= 3 && (
        <div className="border-t border-white/5 pt-4 text-center">
          <p className="text-sm text-white/50 font-medium">
            Already verified?{' '}
            <Link className="font-bold text-q-blue hover:underline" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
