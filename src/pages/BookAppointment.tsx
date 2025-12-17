import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Check, CreditCard, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const BookAppointment = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    time: "",
    message: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const consultationTypes = [
    { value: "structural", label: "Structural Engineering", price: 150 },
    { value: "manufacturing", label: "Manufacturing Consultation", price: 125 },
    { value: "project", label: "Project Assessment", price: 175 },
    { value: "general", label: "General Consultation", price: 100 },
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM",
  ];

  const selectedService = consultationTypes.find(c => c.value === formData.service);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast({
        title: "Booking Confirmed!",
        description: `Your ${selectedService?.label} consultation has been booked for ${date ? format(date, "PPP") : ""} at ${formData.time}.`,
      });
      setStep(4);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <span className="text-primary text-sm uppercase tracking-wider">Book Now</span>
          <h1 className="font-display text-6xl md:text-8xl mt-4 mb-8">
            Schedule a<br />
            <span className="text-primary">Consultation</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Book a one-on-one consultation with our expert engineers. We'll discuss your project requirements and provide tailored solutions.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-center gap-4 md:gap-8">
            {["Details", "Schedule", "Payment", "Confirmation"].map((label, index) => (
              <div key={label} className="flex items-center gap-2 md:gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                    step > index + 1 ? "bg-primary border-primary" :
                    step === index + 1 ? "border-primary text-primary" : "border-muted text-muted-foreground"
                  )}
                >
                  {step > index + 1 ? <Check className="w-5 h-5 text-primary-foreground" /> : index + 1}
                </div>
                <span className={cn(
                  "hidden md:block text-sm uppercase tracking-wider",
                  step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                )}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto">
            {step === 4 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-8 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-display text-4xl mb-4">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-2">
                  Your {selectedService?.label} consultation has been scheduled.
                </p>
                <p className="text-primary text-lg font-medium">
                  {date ? format(date, "EEEE, MMMM do, yyyy") : ""} at {formData.time}
                </p>
                <p className="text-muted-foreground mt-6">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <>
                    <h2 className="font-display text-3xl mb-8">Your Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="+44 123 456 7890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Company</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-card border-border focus:border-primary"
                          placeholder="Your Company Ltd"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm uppercase tracking-wider mb-2">Consultation Type *</label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {consultationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label} - £{type.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm uppercase tracking-wider mb-2">Project Description</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-card border-border focus:border-primary min-h-[120px]"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="font-display text-3xl mb-8">Select Date & Time</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-4">Select Date *</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-card border-border",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-4">Select Time *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, time })}
                              className={cn(
                                "p-3 border text-sm transition-colors",
                                formData.time === time
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="font-display text-3xl mb-8">Payment Details</h2>
                    
                    {/* Order Summary */}
                    <div className="bg-card p-6 border border-border mb-8">
                      <h3 className="font-display text-xl mb-4">Order Summary</h3>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{selectedService?.label}</span>
                        <span>£{selectedService?.price}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Date</span>
                        <span>{date ? format(date, "PPP") : ""}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-muted-foreground">Time</span>
                        <span>{formData.time}</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-primary text-xl">£{selectedService?.price}</span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Card Number</label>
                        <div className="relative">
                          <Input
                            required
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            className="bg-card border-border focus:border-primary pl-12"
                            placeholder="1234 5678 9012 3456"
                          />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm uppercase tracking-wider mb-2">Expiry Date</label>
                          <Input
                            required
                            value={formData.expiry}
                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                            className="bg-card border-border focus:border-primary"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm uppercase tracking-wider mb-2">CVV</label>
                          <Input
                            required
                            type="password"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            className="bg-card border-border focus:border-primary"
                            placeholder="•••"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Your payment is secure and encrypted</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  {step > 1 && step < 4 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 border-border hover:border-primary"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={
                      (step === 1 && (!formData.name || !formData.email || !formData.service)) ||
                      (step === 2 && (!date || !formData.time))
                    }
                    className="flex-1 bg-primary text-primary-foreground hover:bg-gold-light"
                  >
                    {step === 3 ? `Pay £${selectedService?.price}` : "Continue"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;
