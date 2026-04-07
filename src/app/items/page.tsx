'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { useToast } from '@/components/ui/Toast';

interface Item {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const { showToast, ToastComponent } = useToast();

  // Load items from API
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load items:', error);
      showToast('Failed to load items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name.trim()) {
      showToast('Please enter a name', 'error');
      return;
    }

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        showToast('Item created successfully', 'success');
        setNewItem({ name: '', description: '' });
        setShowForm(false);
        loadItems();
      } else {
        showToast('Failed to create item', 'error');
      }
    } catch (error) {
      console.error('Error creating item:', error);
      showToast('Failed to create item', 'error');
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showToast('Item deleted successfully', 'success');
        loadItems();
      } else {
        showToast('Failed to delete item', 'error');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast('Failed to delete item', 'error');
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Items"
        action={{
          label: showForm ? 'Cancel' : '+ Add',
          onClick: () => setShowForm(!showForm),
        }}
      />

      {ToastComponent}

      <div className="container-mobile py-4 space-y-4">
        {/* Add Item Form */}
        {showForm && (
          <div className="card">
            <h3 className="font-semibold mb-3">New Item</h3>
            <form onSubmit={handleCreateItem} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="input-mobile"
                />
              </div>
              <div>
                <textarea
                  placeholder="Description (optional)"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="input-mobile resize-none"
                  rows={2}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Item
              </button>
            </form>
          </div>
        )}

        {/* Items List */}
        <div>
          {loading ? (
            <LoadingSkeleton lines={3} />
          ) : items.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-600 dark:text-gray-400">No items yet</p>
              <p className="text-sm text-gray-500 mt-1">Tap + Add to create your first item</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="relative">
                  <Card
                    title={item.name}
                    description={item.description}
                    metadata={[
                      {
                        label: 'Created',
                        value: new Date(item.created_at).toLocaleDateString(),
                      },
                    ]}
                  />
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="absolute top-2 right-2 text-red-500 p-1 touch-feedback text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
