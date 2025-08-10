"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import AddressForm from "./addressForm";
import { AddressFormData } from "./addressFormSchema";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSubmit = (data: AddressFormData) => {
    console.log("Dados do endereço:", data);
    // Aqui você pode implementar a lógica para salvar o endereço
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new_address" id="add_new_address" />
                <Label htmlFor="add_new_address">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new_address" && (
          <div className="mt-4">
            <AddressForm onSubmit={handleAddressSubmit} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
