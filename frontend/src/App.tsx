import { useEffect, useState } from "react";
import { NetflixGrid } from "./components/NetflixGrid";
import { api } from "./service/api";
import type { Short } from "./types";

export default function App() {
  const [shorts, setShorts] = useState<Short[]>([]);

  useEffect(() => {
    const fetchShorts = async () => {
      const response = await api.get("/shorts");
      setShorts(response.data);
    };
    fetchShorts();
  }, []);

  return <NetflixGrid shorts={shorts} />;
}
