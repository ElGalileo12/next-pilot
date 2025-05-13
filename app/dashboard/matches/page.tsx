"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { useDroppable, useDraggable, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

const jugadoresIniciales = [
  { id: "jugador-1", nombre: "Messi" },
  { id: "jugador-2", nombre: "Mbappé" },
  { id: "jugador-3", nombre: "Modric" },
  { id: "jugador-4", nombre: "Cristiano" },
  { id: "jugador-5", nombre: "Xavi" },
  { id: "jugador-6", nombre: "Iniesta" },
  { id: "jugador-7", nombre: "Kanté" },
  { id: "jugador-8", nombre: "Vinícius" },
  { id: "jugador-9", nombre: "Alaba" },
  { id: "jugador-10", nombre: "Courtois" },
  { id: "jugador-11", nombre: "Carvajal" },
];

const formaciones: Record<string, number[]> = {
  "4-3-3": [4, 3, 3, 1], // Defensas, medios, delanteros, portero
  "3-4-3": [3, 4, 3, 1],
  "4-4-2": [4, 4, 2, 1],
};

export default function CampoFutbol() {
  const [formacionSeleccionada, setFormacionSeleccionada] = useState("4-3-3");

  const zonas = generarZonasDesdeFormacion(formaciones[formacionSeleccionada]);

  const [alineacion, setAlineacion] = useState<Record<string, string | null>>(
    () => {
      const estado: Record<string, string | null> = {};
      zonas.forEach((zona) => (estado[zona.id] = null));
      return estado;
    }
  );

  const onChangeFormacion = (nueva: string) => {
    const nuevasZonas = generarZonasDesdeFormacion(formaciones[nueva]);
    const nuevoEstado: Record<string, string | null> = {};
    nuevasZonas.forEach((z) => (nuevoEstado[z.id] = null));
    setFormacionSeleccionada(nueva);
    setAlineacion(nuevoEstado);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const nuevaAlineacion = { ...alineacion };

    // Remover jugador anterior
    for (const key in nuevaAlineacion) {
      if (nuevaAlineacion[key] === active.id) {
        nuevaAlineacion[key] = null;
      }
    }

    if (over.id === "lista") {
      setAlineacion(nuevaAlineacion);
      return;
    }

    if (typeof over.id === "string" && over.id.startsWith("zona-")) {
      nuevaAlineacion[over.id] = active.id as string;
    }

    setAlineacion(nuevaAlineacion);
  };

  const jugadoresNoAsignados = jugadoresIniciales.filter(
    (j) => !Object.values(alineacion).includes(j.id)
  );

  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={closestCenter}>
      <div className="p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <label htmlFor="formacion" className="font-bold">
            Formación:
          </label>
          <select
            id="formacion"
            value={formacionSeleccionada}
            onChange={(e) => onChangeFormacion(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {Object.keys(formaciones).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <ListaJugadores jugadores={jugadoresNoAsignados} />

          <div className="flex flex-col gap-4 w-full bg-green-600 p-4 rounded-lg">
            {groupZonasPorFila(zonas).map((fila, i) => (
              <div key={i} className="flex justify-center gap-2">
                {fila.map((zona) => (
                  <Zona key={zona.id} id={zona.id}>
                    {alineacion[zona.id] && (
                      <JugadorDraggable
                        id={alineacion[zona.id]!}
                        nombre={
                          jugadoresIniciales.find(
                            (j) => j.id === alineacion[zona.id]
                          )?.nombre || ""
                        }
                      />
                    )}
                  </Zona>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

// Utilidades

function generarZonasDesdeFormacion(capacidades: number[]) {
  const zonas = [];
  let index = 0;
  for (let fila = 0; fila < capacidades.length; fila++) {
    for (let i = 0; i < capacidades[fila]; i++) {
      zonas.push({
        id: `zona-${index}`,
        fila,
        orden: i,
      });
      index++;
    }
  }
  return zonas;
}

function groupZonasPorFila(zonas: { id: string; fila: number }[]) {
  const filas: Record<number, { id: string }[]> = {};
  zonas.forEach((zona) => {
    if (!filas[zona.fila]) filas[zona.fila] = [];
    filas[zona.fila].push(zona);
  });
  return Object.values(filas);
}

// Componentes

function ListaJugadores({
  jugadores,
}: {
  jugadores: { id: string; nombre: string }[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "lista" });

  return (
    <div
      ref={setNodeRef}
      className={`w-1/3 p-2 rounded border-2 min-h-[200px] bg-white ${
        isOver ? "border-yellow-300" : "border-transparent"
      }`}
    >
      <h2 className="text-lg font-bold mb-2">Jugadores</h2>
      <div className="flex flex-col gap-2">
        {jugadores.map((jugador) => (
          <JugadorDraggable
            key={jugador.id}
            id={jugador.id}
            nombre={jugador.nombre}
          />
        ))}
      </div>
    </div>
  );
}

function JugadorDraggable({ id, nombre }: { id: string; nombre: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 bg-white rounded shadow cursor-move text-center ${
        isDragging ? "opacity-50" : ""
      }`}
      style={style}
    >
      {nombre}
    </div>
  );
}

function Zona({ id, children }: { id: string; children?: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-20 h-20 bg-green-500 rounded flex items-center justify-center border-2 transition-all ${
        isOver ? "border-yellow-300" : "border-transparent"
      }`}
    >
      {children}
    </div>
  );
}
