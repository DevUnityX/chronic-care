"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  age: string;
  weight: string;
  condition: string;
  allergy: string;
  emergencyEmail: string;
};

export default function Page() {
  const [form, setForm] = useState<FormState>({
    age: "",
    weight: "",
    condition: "",
    allergy: "",
    emergencyEmail: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    const ageNum = Number(form.age);
    if (!form.age) newErrors.age = "Age is required.";
    else if (!Number.isFinite(ageNum) || !Number.isInteger(ageNum))
      newErrors.age = "Age must be an integer.";
    else if (ageNum <= 0 || ageNum > 120)
      newErrors.age = "Please enter a valid age (1-120).";

    const weightNum = Number(form.weight);
    if (!form.weight) newErrors.weight = "Weight is required.";
    else if (Number.isNaN(weightNum) || weightNum <= 0)
      newErrors.weight = "Please enter a valid weight.";

    if (!form.condition) newErrors.condition = "Please select a condition.";

    if (!form.emergencyEmail)
      newErrors.emergencyEmail = "Emergency email is required.";
    else {
      // simple email check
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.emergencyEmail))
        newErrors.emergencyEmail = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Here you would usually send data to an API.
    setSubmitted(true);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Onboarding</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Provide a few details so we can personalize your experience.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              inputMode="numeric"
              min={0}
              value={form.age}
              onChange={handleChange}
              placeholder="e.g. 35"
              aria-invalid={!!errors.age}
              className="mt-1"
            />
            {errors.age && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                {errors.age}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              inputMode="decimal"
              step="0.1"
              value={form.weight}
              onChange={handleChange}
              placeholder="e.g. 72.5"
              aria-invalid={!!errors.weight}
              className="mt-1"
            />
            {errors.weight && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                {errors.weight}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="condition">Condition</Label>
            <select
              id="condition"
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={!!errors.condition}
            >
              <option value="">Select condition</option>
              <option value="diabetes">Diabetes</option>
              <option value="hypertension">Hypertension</option>
              <option value="heart">Heart disease</option>
              <option value="asthma">Asthma</option>
              <option value="other">Other</option>
            </select>
            {errors.condition && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                {errors.condition}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="allergy">Allergy or dietary mix</Label>
            <Textarea
              id="allergy"
              name="allergy"
              value={form.allergy}
              onChange={handleChange}
              placeholder="List allergies or dietary preferences (e.g. peanuts, vegan, gluten-free)"
              className="mt-1"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="emergencyEmail">Emergency contact email</Label>
            <Input
              id="emergencyEmail"
              name="emergencyEmail"
              type="email"
              value={form.emergencyEmail}
              onChange={handleChange}
              placeholder="someone@example.com"
              aria-invalid={!!errors.emergencyEmail}
              className="mt-1"
            />
            {errors.emergencyEmail && (
              <p className="text-sm text-red-600 mt-1" role="alert">
                {errors.emergencyEmail}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit">Save and continue</Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() =>
                setForm({
                  age: "",
                  weight: "",
                  condition: "",
                  allergy: "",
                  emergencyEmail: "",
                })
              }
            >
              Reset
            </Button>
          </div>
        </form>
      ) : (
        <section className="rounded-md border p-4 bg-green-50">
          <h2 className="text-lg font-medium">Thanks — onboarding complete</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We have saved your information. Review below:
          </p>

          <div className="mt-4 space-y-1 text-sm">
            <div>
              <strong>Age:</strong> {form.age}
            </div>
            <div>
              <strong>Weight:</strong> {form.weight} kg
            </div>
            <div>
              <strong>Condition:</strong> {form.condition || "—"}
            </div>
            <div>
              <strong>Allergies / Dietary:</strong> {form.allergy || "—"}
            </div>
            <div>
              <strong>Emergency Email:</strong> {form.emergencyEmail}
            </div>
          </div>

          <div className="mt-4">
            <Button onClick={() => setSubmitted(false)}>Edit</Button>
          </div>
        </section>
      )}
    </main>
  );
}
