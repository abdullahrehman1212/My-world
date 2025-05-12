import { create } from 'zustand';
import { AdminState, AdminSection } from '../types/admin';
import { supabase } from '../lib/supabase';

export const useAdminStore = create<AdminState>((set, get) => ({
  sections: [],
  isAuthenticated: false,
  loading: false,
  error: null,
  setSections: (sections) => set({ sections }),
  setAuthenticated: (status) => set({ isAuthenticated: status }),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error }),
  
  updateSection: async (id, data) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('admin_sections')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      const { data: updatedData, error: fetchError } = await supabase
        .from('admin_sections')
        .select('*')
        .order('created_at');

      if (fetchError) throw fetchError;

      set({ sections: updatedData || [] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteSection: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('admin_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        sections: state.sections.filter(section => section.id !== id)
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createSection: async (data) => {
    try {
      set({ loading: true, error: null });
      
      const { data: newSection, error } = await supabase
        .from('admin_sections')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        sections: [...state.sections, newSection]
      }));
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));

export default useAdminStore;