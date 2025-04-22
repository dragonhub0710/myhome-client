/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { supabase } from "@/src/lib/supabase";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { useAtomValue } from "jotai";
import { useToast } from "@/src/hooks/use-toast";
import { authAtom } from "@/src/atoms/authAtom";
import Loading_Animation from "@/src/components/loading/light_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface AttributeProps {
  id: string;
  name: string;
  unit: string;
}

interface AssumptionProps {
  values: {
    [attributeId: string]: number;
  };
  user_email: string;
}

export default function AssumptionTab() {
  const { toast } = useToast();
  const auth = useAtomValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [attributes, setAttributes] = useState<AttributeProps[]>([]);
  const [values, setValues] = useState<{
    [attributeId: string]: string;
  }>({});
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (auth.user) {
      getAllAttributes();
    }
  }, [auth]);

  const getAllAttributes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("assumption_attributes")
        .select("*")
        .order("order", { ascending: true });
      if (error) throw error;
      setAttributes(data);
      getAllAssumptions(data);
    } catch (err) {
      console.log(err);
      toast.error({
        title: "Something went wrong",
        description: "Please check your internet connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllAssumptions = async (attributes: AttributeProps[]) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("assumptions")
        .select("*")
        .eq("user_email", auth.user.email);
      if (error) throw error;

      const initialValues: { [attributeId: string]: string } = {};
      if (data?.length > 0) {
        attributes.forEach((attribute) => {
          const value = data[0].values[attribute.id];
          initialValues[attribute.id] =
            value !== undefined ? String(value) : "";
        });
      }
      setValues(initialValues);
    } catch (error) {
      console.log(error);
      toast.error({
        title: "Something went wrong",
        description: "Please check your internet connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const rowValues: AssumptionProps["values"] = {};

      attributes.forEach((attribute) => {
        const value = values[attribute.id];
        if (value) {
          rowValues[attribute.id] = Number.parseFloat(value);
        }
      });

      const assumptions = {
        user_email: auth.user.email,
        values: rowValues,
      };

      const { error } = await supabase
        .from("assumptions")
        .upsert(assumptions, { onConflict: "user_email" });

      if (error) throw error;

      setIsEditable(false);
    } catch (err) {
      console.error("Error saving assumptions:", err);
      toast.error({
        title: "Something went wrong",
        description: "Please check your internet connection and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (attributeId: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [attributeId]: value.toString(),
    }));
  };

  return (
    <div className="w-full bg-white max-w-[600px] border-[1px] shadow p-10 rounded-xl">
      <div className="space-y-4 flex flex-col">
        <p className="text-xl font-semibold mx-1">Local Vendor Pricing</p>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="space-y-3 p-2 max-h-[430px] overflow-y-auto">
          {attributes &&
            attributes.length > 0 &&
            attributes.map((attribute) => {
              const paddingRight = 8 * attribute.unit.length + 20;
              return (
                <div key={attribute.id} className="flex items-center space-x-4">
                  <label className="w-[150px] text-sm">{attribute.name}</label>
                  <div className="relative flex flex-1 items-center">
                    <Input
                      type="number"
                      step="0.01"
                      disabled={!isEditable}
                      placeholder={`Enter value${
                        attribute.unit ? ` in ${attribute.unit}` : ""
                      }`}
                      value={values[attribute.id] || ""}
                      onChange={(e) =>
                        handleValueChange(attribute.id, e.target.value)
                      }
                      style={{ paddingRight: paddingRight }}
                      className="w-full border border-gray-300 rounded pl-3 py-2 disabled:opacity-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="absolute right-3 text-xs">
                      / {attribute.unit}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex space-x-2 w-full justify-end">
          {isEditable ? (
            <div className="flex space-x-2">
              <Button
                onClick={() => handleSubmit()}
                disabled={isLoading}
                className="w-[120px]"
              >
                {isLoading ? (
                  <div className="w-16 h-16">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  <p>Save</p>
                )}
              </Button>
              <Button
                onClick={() => setIsEditable(false)}
                className="w-[120px] border-primary bg-white text-primary hover:bg-primary hover:text-white"
                variant="outline"
              >
                <p>Cancel</p>
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditable(true)} className="w-[120px]">
              <p>Edit</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
