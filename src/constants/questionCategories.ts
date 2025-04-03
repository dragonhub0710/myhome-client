// constants/questionCategories.ts
export const orderedCategories = [
"Electrical",
"Exterior Doors",
"Fireplace",
"Flooring",
"Full bathroom",
"General/Final",
"Half Bathroom",
"HVAC",
"Interior Doors",
"Kitchen",
"Master Bathroom",
"Windows",
];

export const categorizedQuestions: {
[category: string]: string[];
} = {
Electrical: ["electrical_outlets", "light_above_kitchen_sink", "vanity_overhead_lights"],
"Exterior Doors": ["replace_front_door"],
Fireplace: ["fireplace_type", "fireplace_remodel"],
Flooring: ["shower_floor_tile_sqft", "vinyl_flooring_area"],
"Full bathroom": ["full_bath_sink", "full_bath_toilet"],
"General/Final": ["glade_plugins", "number_of_cabinet_drawers"],
"Half Bathroom": ["half_bath_faucet", "half_bath_toilet"],
HVAC: ["hvac_type", "4x10_ground_air_registers"],
"Interior Doors": ["bedroom_door_type"],
Kitchen: ["changing_kitchen_faucet", "kitchen_sink_type"],
"Master Bathroom": ["master_shower_tile", "master_sink_type"],
Windows: ["number_of_windows", "window_trim_type"],
};
