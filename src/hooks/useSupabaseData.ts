import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Course, Category, Resource, ResourceCategory, Chapter, Review, Profile, Order } from '../types';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('categories').select('*').order('sort_order').then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  return { categories: data, loading };
}

export function useCourses(opts?: { featured?: boolean; categoryId?: string }) {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase.from('courses').select('*').eq('is_published', true).order('created_at', { ascending: false });
    if (opts?.featured) q = q.eq('is_featured', true);
    if (opts?.categoryId) q = q.eq('category_id', opts.categoryId);
    q.then(({ data, error }) => { if (error) console.error('useCourses error:', error); setData(data || []); setLoading(false); });
  }, [opts?.featured, opts?.categoryId]);
  return { courses: data, loading };
}

export function useCourseBySlug(slug: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    supabase.from('courses').select('*').eq('slug', slug).single().then(({ data }) => {
      setCourse(data);
      setLoading(false);
    });
  }, [slug]);
  return { course, loading };
}

export function useChapters(courseId: string | undefined) {
  const [data, setData] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!courseId) { setLoading(false); return; }
    supabase.from('chapters').select('*, lessons(*)').eq('course_id', courseId).order('sort_order').then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, [courseId]);
  return { chapters: data, loading };
}

export function useReviews(courseId: string | undefined) {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!courseId) { setLoading(false); return; }
    supabase.from('reviews').select('*, profiles(username, avatar_url)').eq('course_id', courseId).then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, [courseId]);
  return { reviews: data, loading };
}

export function useResourceCategories() {
  const [data, setData] = useState<ResourceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('resource_categories').select('*').order('sort_order').then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  return { resourceCategories: data, loading };
}

export function useResources(opts?: { categoryId?: string }) {
  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase.from('resources').select('*').eq('is_published', true).order('created_at', { ascending: false });
    if (opts?.categoryId) q = q.eq('category_id', opts.categoryId);
    q.then(({ data }) => { setData(data || []); setLoading(false); });
  }, [opts?.categoryId]);
  return { resources: data, loading };
}

export function useAdvertisements(position?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let q = supabase.from('advertisements').select('*').eq('is_active', true).order('priority');
    if (position) q = q.eq('position', position);
    q.then(({ data }) => { setData(data || []); setLoading(false); });
  }, [position]);
  return { ads: data, loading };
}

export function useAllAdvertisements() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => {
    setLoading(true);
    supabase.from('advertisements').select('*').order('priority').then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { ads: data, loading, refresh };
}

export function useAdminCourses() {
  const [data, setData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => {
    setLoading(true);
    supabase.from('courses').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { courses: data, loading, refresh };
}

export function useAdminResources() {
  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => {
    setLoading(true);
    supabase.from('resources').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { resources: data, loading, refresh };
}

export function useAdminUsers() {
  const [data, setData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => {
    setLoading(true);
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { users: data, loading, refresh };
}

export function useAdminOrders() {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(() => {
    setLoading(true);
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { orders: data, loading, refresh };
}

export function useSgccMaterials() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('sgcc_materials').select('*').order('sort_order').then(({ data }) => {
      setData(data || []);
      setLoading(false);
    });
  }, []);
  return { materials: data, loading };
}
