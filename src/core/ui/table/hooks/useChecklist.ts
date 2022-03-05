import { useState } from 'react';

const useChecklist = (data: any[]) => {
  const [checklist, setChecklist] = useState<
    Record<string, boolean | undefined>
  >({});

  const toggleChecklist = (field?: string) => {
    if (field) {
      const curChecklist = { ...checklist };
      if (checklist[field]) {
        delete curChecklist[field];
      } else {
        curChecklist[field] = true;
      }
      setChecklist(curChecklist);
    } else {
      const updatedChecklist: Record<string, boolean> = {};
      if (Object.values(checklist).length !== data.length) {
        data.forEach((item) => {
          updatedChecklist[item.id] = true;
        });
      }

      setChecklist(updatedChecklist);
    }
  };

  return { checklist, toggleChecklist };
};

export default useChecklist;
