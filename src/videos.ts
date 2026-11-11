// Vídeos de exemplo do estudo (11/11/2026): vídeos públicos da Icon (stream.mux.com), usados com autorização do dono
// da Icon segundo o usuário. Capa pela miniatura pública do Mux.
export type Video = { id: string; criador: string; marca: string; formato: string };

export const mp4 = (id: string) => `https://stream.mux.com/${id}/highest.mp4`;
export const capa = (id: string) => `https://image.mux.com/${id}/thumbnail.jpg?width=540&time=1`;

export const MEUS: Video[] = [
  { id: "61zKmMRxyRONPXb7wc3Wo9q01LDvSNhg5iK6q3Tff5Us", criador: "você", marca: "David", formato: "Listicle" },
  { id: "BUrDMqyzLqxW1O010100cGVALR8bXKAgX2bpUD0202OnxeHg", criador: "você", marca: "Olipop", formato: "Street Interview" },
  { id: "b7uUvadqlevnv02CJqvwYfUJymClfYsKiCb3IWEt5KPk", criador: "você", marca: "Last Crumb", formato: "Resposta a comentário" },
  { id: "18Xe5T00bVdYgqLbyx01OBz1dEUWX2eMfJU3bnbedwZ01k", criador: "você", marca: "Skims", formato: "GRWM" },
  { id: "CWepr00dsZ8g5m1z9feMzkAPmp2EoCQ01EK7u3fTAch3o", criador: "você", marca: "Fenvio", formato: "Skit" },
];

export const REFERENCIAS: Video[] = [
  { id: "IRTLIluJfBd014gfubtmU01FrkBcDjqbPxeS2kioTI01Ww", criador: "ivy", marca: "Pocket AI", formato: "Product Demo" },
  { id: "YZuxoJHMp29u6QWhoI6EQbNRs006vZig9KbZWvnUQOQw", criador: "mia", marca: "Lucky Energy", formato: "Testimonial" },
  { id: "5KaGE2xDfjovIHgYRiZTKMSw4Koe5BNU5DXzQQtwO2g", criador: "ella", marca: "RougeCare", formato: "Unboxing" },
  { id: "vMJz1cFmohbs5UOM7nZ6eCVKbzg44f4OxoIp5IlQ7Jc", criador: "lily", marca: "Modern Gents", formato: "B-Roll + Voiceover" },
  { id: "PiZJOAM57j6qQv01Mi373NmLWOanfHFX7m02uUvzEspeM", criador: "nina", marca: "Fellow", formato: "Green Screen" },
  { id: "4KCv8KImS34pFkOBWNoZ00m0048c01j402itSOkoo5kGHFc", criador: "maya", marca: "US Auto Insurance Now", formato: "Whiteboard" },
  { id: "Zd500t2eAaUvXndS87SsWnlvA8rruygbd1JNnosnpOPM", criador: "nina", marca: "Modern Gents", formato: "Yapping" },
  { id: "M00UQuka8h77xCMbQ7HD7a702F3eV31L3aF01YIqBFGKLQ", criador: "emma", marca: "ClickUp", formato: "Motion Graphic" },
  { id: "3A9XKu7KqVRMFc9CIRMG01WXEE9sQMqC1XDFP4fw5jEU", criador: "nova", marca: "Gut Culture", formato: "Cartoon" },
];

export const SUGESTOES: Video[] = [
  { id: "Yga96mOW2fxSnhqqfCvFP9V7Ln63QBhYscDOUR014xPo", criador: "eli", marca: "Viktor", formato: "Sugestão" },
  { id: "yhrEGa9fFZQBJ453evwUV02xzzC02CUEarSeGizpkDLOY", criador: "luke", marca: "Verse Fitness", formato: "Sugestão" },
  { id: "wR02csKIQGu01yV7jYspf12s6FMKD0202JnyP702HWRaqgH00", criador: "noah", marca: "Cushionaire", formato: "Sugestão" },
  { id: "00hqpNGoFbYRui9SLvved00udu9db1UVkDsqP005X7yEF8", criador: "ethan", marca: "Modern Gents", formato: "Sugestão" },
  { id: "bvxTkKrFM9G8EJ009XGCVDEwzUgsgON6F97x7vA7I00Es", criador: "miles", marca: "MARO", formato: "Sugestão" },
  { id: "ScaxW00ypKIioPeO9Bzy691CqawqRYM2MusN7bc402rgg", criador: "theo", marca: "Cafely", formato: "Sugestão" },
  { id: "pIZLfd7jrfoxtJYs500rxnss5Fmkx3V4PjgqPvQu00eTU", criador: "jack", marca: "Neupril", formato: "Sugestão" },
  { id: "TTy1QdHOcK2uH6HsuoevWGHRV4yzYIMWYwTNGObYrSo", criador: "cole", marca: "ClickUp", formato: "Sugestão" },
  { id: "kL8h4UdzgaLyAEJsRepfS500ony1fIgqtghFuHobXyYQ", criador: "", marca: "", formato: "App Walkthrough" },
  { id: "qAzopEDBXKQTbe201rsyP01wECyYj5zIClb01nc7CJxcQU", criador: "max", marca: "GrowthSync", formato: "Sugestão" },
];
