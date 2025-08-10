import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: {
    1: {
      title: "Plumbing Services",
      sub: [
        "Tap, sink, toilet repair & installation",
        "Pipeline leak fix, drainage cleaning",
        "Water tank & motor servicing",
      ],
    },
    2: {
      title: "Electrical Services",
      sub: [
        "Switchboard, light, fan, inverter repair",
        "Wiring, MCB, fuse box setup",
        "Appliance installations (TV, geyser, etc.)",
      ],
    },
    3: {
      title: "AC & HVAC Services",
      sub: [
        "AC installation, repair & servicing",
        "Gas refilling, duct cleaning",
        "Ventilation & heating system maintenance",
      ],
    },
    4: {
      title: "Home Appliances Repair",
      sub: [
        "Refrigerator, washing machine, microwave",
        "Water purifier (RO), chimney, geyser",
        "Inverter, TV, induction, oven",
      ],
    },
    5: {
      title: "Carpentry & Interior Fittings",
      sub: [
        "Wooden furniture repair & polishing",
        "Bed, wardrobe, shelf, door work",
        "Modular kitchen setup",
        "Curtain rod & blinds installation",
      ],
    },
    6: {
      title: "Painting, Waterproofing & Décor",
      sub: [
        "Interior & exterior painting",
        "Wall textures, stencils, wallpaper",
        "POP & false ceiling work",
        "Roof waterproofing & wall crack repairs",
      ],
    },
    7: {
      title: "Cleaning, Laundry & Sanitization",
      sub: [
        "Deep home, kitchen, and bathroom cleaning",
        "Sofa, carpet, mattress cleaning",
        "Disinfection & sanitization",
        "Laundry & dry-cleaning pickup",
      ],
    },
    8: {
      title: "Pest Control",
      sub: [
        "Termites, cockroaches, ants, rodents",
        "Mosquito fogging, bed bugs",
        "Herbal & chemical treatments",
      ],
    },
    9: {
      title: "Metal & Structural Work",
      sub: [
        "Welding & fabrication",
        "Steel/iron door, grill, gate repair",
        "Aluminum & glass fitting work",
        "Masonry & minor wall works",
      ],
    },
    10: {
      title: "Gardening & Landscaping",
      sub: [
        "Lawn mowing, hedge trimming",
        "Garden design & plant setup",
        "Drip irrigation, plant care",
      ],
    },
    11: {
      title: "IT & Smart Home Support",
      sub: [
        "CCTV & security system setup",
        "Wi-Fi/router/networking support",
        "Laptop, printer, and basic IT repair",
        "Smart device installations (Alexa, lights, etc.)",
      ],
    },
    12: {
      title: "Shifting & General Help",
      sub: [
        "House shifting & relocation (packers & movers)",
        "Furniture assembly/disassembly",
        "Old appliance disposal",
        "Handyman services for odd jobs",
      ],
    },
  },
};

export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
});

export default serviceSlice.reducer;