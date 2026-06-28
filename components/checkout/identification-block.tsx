"use client"

import { useState } from "react"
import { CheckoutField } from "@/components/checkout/checkout-field"
import { SectionHeading } from "@/components/checkout/section-heading"

export function IdentificationBlock() {
  const [cepLoaded, setCepLoaded] = useState(false)

  return (
    <section className="flex flex-col gap-6" aria-labelledby="ident-heading">
      <SectionHeading step={1} title="Identificação e Entrega" />

      <div className="flex flex-col gap-4">
        <CheckoutField
          label="E-mail"
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="seu@email.com"
          required
        />
        <CheckoutField
          label="Nome Completo"
          id="nome"
          name="nome"
          autoComplete="name"
          placeholder="Como no documento"
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CheckoutField label="CPF" id="cpf" name="cpf" inputMode="numeric" placeholder="000.000.000-00" required />
          <CheckoutField
            label="Telefone"
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5 sm:col-span-1">
            <label htmlFor="cep" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="00000-000"
              required
              onChange={(e) => setCepLoaded(e.target.value.replace(/\D/g, "").length >= 8)}
              className="h-12 w-full rounded-md border border-input bg-card px-4 text-sm font-medium text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <span className="text-xs text-muted-foreground">Preencheremos o resto pra você.</span>
          </div>
          <CheckoutField label="Endereço" id="rua" name="rua" className="sm:col-span-2" placeholder="Rua, avenida..." required />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <CheckoutField label="Número" id="numero" name="numero" inputMode="numeric" placeholder="123" required />
          <CheckoutField label="Complemento" id="complemento" name="complemento" placeholder="Apto, bloco" />
          <CheckoutField label="Bairro" id="bairro" name="bairro" className="col-span-2 sm:col-span-2" placeholder="Seu bairro" required />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CheckoutField label="Cidade" id="cidade" name="cidade" className="sm:col-span-2" placeholder="Sua cidade" required />
          <CheckoutField label="UF" id="uf" name="uf" placeholder="SP" required />
        </div>
        {cepLoaded && (
          <p className="text-xs text-foreground">
            <span className="rounded bg-primary/30 px-2 py-1">Endereço localizado pelo CEP.</span>
          </p>
        )}
      </div>
    </section>
  )
}
